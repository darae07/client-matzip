import _ from 'lodash'
import React, { ReactElement, useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import {
  WhiteRoundedCard,
  HomeLayout,
  UserAvatarTooltip,
  PlusButton,
  Modal,
  SearchAndSelectUser,
  Button,
  openToast,
} from '@/components'
import {
  CategoryName,
  KakaoMap,
  EatModal,
  KeywordName,
  ReviewDetailModal,
  KeywordScore,
} from '@/components/modules'
import { NextPageWithLayout, PartyMembership } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { calculatePercent } from '@/utils'
import {
  useInvitePartyMutation,
  useJoinPartyMutation,
  useMyTeamQuery,
  useOutPartyMutation,
  usePartyItemQuery,
  useReviewQuery,
} from '@/queries'

const PartyDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router
  const { id } = query
  const queryClient = useQueryClient()

  const { data, error, isLoading } = usePartyItemQuery(id)

  useEffect(() => {
    if (error) {
      openToast(
        error.response.data.message || '오늘의 메뉴를 찾을 수 없습니다.',
      )
      if (!isLoading) {
        router.back()
      }
    }
  }, [error, isLoading])

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const myTeam = useMyTeamQuery(teamId)

  const [myMembership, setMyMembership] = useState<PartyMembership>()
  useEffect(() => {
    if (data && data?.membership) {
      const my_membership = _.find(data.membership, function (e) {
        return e.team_member.id === team_profile?.id
      })
      setMyMembership(my_membership)
    }
  }, [data, team_profile])

  const joinMutation = useJoinPartyMutation(setMyMembership, id, data)

  const handleJoinParty = () => {
    const data = { party: Number(id) }
    joinMutation.mutate(data)
  }

  const outMutation = useOutPartyMutation(setMyMembership, id, data)

  const handleOutParty = () => {
    outMutation.mutate(myMembership?.id)
  }

  const [isEatModalOpen, setEatModalOpen] = useState(false)
  const openEatModal = () => setEatModalOpen(true)

  const keyword = data?.keyword.id
  const review = useReviewQuery(keyword)
  const [isOpenReviewDetailModal, setOpenReviewDetailModal] = useState(false)
  const [reviewImageId, setReviewImageId] = useState<number>()
  const handleSelectReviewImage = (id: number) => {
    setReviewImageId(id)
    setOpenReviewDetailModal(true)
  }

  const [isSearchModalOpen, setSearchModalOpen] = useState(false)
  const openSearchModal = () => setSearchModalOpen(true)
  const closeSearchModal = () => setSearchModalOpen(false)

  const inviteMutation = useInvitePartyMutation()

  const userSelectAction = (receiverId: number) => {
    const data = {
      party: id,
      receiver: receiverId,
    }
    inviteMutation.mutate(data)
    queryClient.invalidateQueries('member')
  }

  if (data)
    return (
      <div>
        <WhiteRoundedCard className="mb-4">
          {!_.isEmpty(data.reviews) && (
            <div className="mb-2 flex overflow-x-auto">
              {data.reviews.map((review) =>
                review.images?.map((image) => (
                  <div
                    className="mr-1 shrink-0 hover:cursor-pointer"
                    key={image.id}
                    onClick={() => {
                      handleSelectReviewImage(image.id)
                    }}
                  >
                    <Image
                      src={image.image}
                      alt={data.keyword.category?.name}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </div>
                )),
              )}
            </div>
          )}
          <p className="mb-2 text-2xl font-bold">{data.name}</p>

          <div className="mb-4 flex items-center">
            <CategoryName category={data.keyword.category} className="mr-2" />
            <KeywordName keyword={data.keyword} />
            <KeywordScore keyword={data.keyword} className="ml-3" />
          </div>

          <div className="mt-1 text-sm">
            <p>맛집 인기도</p>
            <p>오늘의 메뉴에 등록된 횟수: {data.keyword.hit_count}</p>
            <p>동료들이 식사한 횟수: {data.keyword.eat_count}</p>
            <p>
              맛있다 비율:
              {calculatePercent(
                data.keyword.good_count,
                data.keyword.eat_count,
              )}
              %
            </p>
          </div>

          <div className="mt-4 text-sm">{data.description}</div>

          <div className="my-4 flex justify-between border border-white border-y-gray-200 py-3">
            <div className="flex -space-x-1">
              {data.membership.map((membership) => (
                <UserAvatarTooltip
                  user={membership.team_member}
                  key={membership.id}
                  membership={membership}
                />
              ))}
              {!!myMembership && <PlusButton onClick={openSearchModal} />}
              <Modal handleClose={closeSearchModal} isOpen={isSearchModalOpen}>
                <SearchAndSelectUser
                  selectAction={userSelectAction}
                  party={Number(id)}
                  mutatonState={inviteMutation}
                />
              </Modal>
            </div>
            <div>
              {!!myMembership ? (
                <div>
                  <Button
                    onClick={() => handleOutParty()}
                    size="small"
                    color="blue"
                    disabled={outMutation.isLoading}
                  >
                    나가기
                  </Button>
                  <EatModal
                    isOpen={isEatModalOpen}
                    setOpen={setEatModalOpen}
                    domain="party"
                  />
                  {!data.eat && (
                    <Button
                      onClick={openEatModal}
                      className="ml-2"
                      size="small"
                      color="pink"
                    >
                      먹었어요
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => handleJoinParty()}
                  size="small"
                  color="blue"
                  disabled={joinMutation.isLoading}
                >
                  같이갈래요
                </Button>
              )}
            </div>
          </div>
        </WhiteRoundedCard>

        {myTeam.data && (
          <WhiteRoundedCard className="h-72">
            <KakaoMap
              location={myTeam.data.location}
              keyword={data.keyword.name}
            />
          </WhiteRoundedCard>
        )}

        {reviewImageId && (
          <ReviewDetailModal
            reviews={review}
            reviewImageId={reviewImageId}
            isOpen={isOpenReviewDetailModal}
            setIsOpen={setOpenReviewDetailModal}
          />
        )}
      </div>
    )
  return <></>
}

export default PartyDetail

PartyDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
