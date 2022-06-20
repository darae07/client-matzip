import _ from 'lodash'
import React, { ReactElement, useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import {
  WhiteRoundedCard,
  HomeLayout,
  UserAvatarTooltip,
  LoadingSpinner,
  InfiniteScroll,
  ListItem,
  YLineCard,
  UserAvatar,
  PlusButton,
  Modal,
  SearchAndSelectUser,
  Button,
} from '@/components'
import {
  CategoryName,
  KakaoMap,
  EatModal,
  KeywordName,
  ReviewDetailModal,
  KeywordScore,
  KeywordScoreIcon,
} from '@/components/modules'
import {
  NextPageWithLayout,
  PartyMembership,
  Review,
  ReviewImage,
} from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { calculatePercent, printDateTimeForToday } from '@/utils'
import {
  useInvitePartyMutation,
  useJoinPartyMutation,
  useMyTeamQuery,
  useOutPartyMutation,
  usePartyItemQuery,
  useReviewQuery,
} from '@/queries'

const PartyDetail: NextPageWithLayout = () => {
  const { query } = useRouter()
  const { id } = query
  const queryClient = useQueryClient()

  const { data, error, isLoading } = usePartyItemQuery(id)

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
  const reviewData = review.data
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

        {review.isLoading ? (
          <div className="mt-10 mb-5 flex w-full justify-center">
            <LoadingSpinner width={30} height={30} />
          </div>
        ) : (
          reviewData?.pages && (
            <WhiteRoundedCard className="mt-4">
              <p className="mb-5 text-xl">
                이 맛집을 추천한 동료들
                <span className="ml-1 text-gray-500">
                  ({reviewData.pages[0]?.count})
                </span>
              </p>
              <ul>
                {reviewData.pages.map((group, i) => (
                  <Fragment key={i}>
                    {group.results.map((item: Review) => (
                      <ListItem
                        key={item.id}
                        isPreviousData={
                          review.isFetching && !review.isFetchingNextPage
                        }
                      >
                        <YLineCard className="relative">
                          <div className="flex">
                            <UserAvatar user={item.team_member} />
                            <span className="ml-1">
                              {item.team_member.member_name}
                            </span>
                          </div>
                          <KeywordScoreIcon
                            score={item.score}
                            className="absolute right-0"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            {printDateTimeForToday(item.created_at)}
                          </p>
                          <p className="my-4">{item.content}</p>

                          <div className="flex">
                            {item.images?.map((image: ReviewImage) => (
                              <div
                                className="mr-2"
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
                            ))}
                          </div>
                        </YLineCard>
                      </ListItem>
                    ))}
                  </Fragment>
                ))}
              </ul>
              <InfiniteScroll
                fetchNextPage={review.fetchNextPage}
                isFetchingNextPage={review.isFetchingNextPage}
                hasNextPage={review.hasNextPage}
              />
              {reviewImageId && (
                <ReviewDetailModal
                  reviewImageId={reviewImageId}
                  keyword={keyword}
                  isOpen={isOpenReviewDetailModal}
                  setIsOpen={setOpenReviewDetailModal}
                />
              )}
            </WhiteRoundedCard>
          )
        )}
      </div>
    )
  return <></>
}

export default PartyDetail

PartyDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
