import _ from 'lodash'
import React, { ReactElement, useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import {
  WhiteRoundedCard,
  HomeLayout,
  UserAvatarTooltip,
  openToast,
  LoadingSpinner,
  InfiniteScroll,
  ListItem,
  YLineCard,
  UserAvatar,
  PlusButton,
  Modal,
  SearchAndSelectUser,
} from '@/components'
import {
  CategoryName,
  KakaoMap,
  EatModal,
  KeywordName,
  ReviewDetailModal,
} from '@/components/modules'
import {
  NextPageWithLayout,
  ApiResponseData,
  Party,
  Team,
  PartyMembership,
  PaginatedResult,
  Review,
  ReviewImage,
} from '@/type'
import { useAppSelector, useMutationHandleError } from '@/utils/hooks'
import {
  inviteParty,
  joinParty,
  listReview,
  outParty,
  retrieveParty,
  retrieveTeam,
} from '@/api'
import { calculatePercent, printDateTimeForToday } from '@/utils'

const PartyDetail: NextPageWithLayout = () => {
  const { query } = useRouter()
  const { id } = query
  const queryClient = useQueryClient()

  const { data, error, isLoading } = useQuery(
    ['partyItem', id],
    () => retrieveParty<Party>(id),
    { enabled: !!id },
  )

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const myTeam = useQuery(
    ['myTeam', teamId],
    () => retrieveTeam<Team>(teamId),
    {
      enabled: !!teamId,
      staleTime: 1000 * 60 * 60,
    },
  )

  const [myMembership, setMyMembership] = useState<PartyMembership>()
  useEffect(() => {
    if (data && data?.membership) {
      const my_membership = _.find(data.membership, function (e) {
        return e.team_member.id === team_profile?.id
      })
      setMyMembership(my_membership)
    }
  }, [data, team_profile])

  const joinMutation = useMutationHandleError(
    joinParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '참여 완료')
        setMyMembership(result)
        const membership = data ? data.membership : []
        const updatedParty = { ...data, membership: [...membership, result] }
        queryClient.setQueryData(['partyItem', id], updatedParty)
        queryClient.setQueriesData(['party', { id: id }], updatedParty)
      },
    },
    '참여할 수 없습니다.',
  )

  const handleJoinParty = () => {
    const data = { party: Number(id) }
    joinMutation.mutate(data)
  }

  const outMutation = useMutationHandleError(
    outParty,
    {
      onSuccess: (response: ApiResponseData<any>) => {
        const { message, result } = response
        openToast(message || '나가기 완료')
        const membership = data ? data.membership : []
        const updatedParty = {
          ...data,
          membership: _.filter(membership, (e) => {
            return e.team_member.id !== team_profile?.id
          }),
        }
        setMyMembership(undefined)
        queryClient.setQueryData(['partyItem', id], updatedParty)
        queryClient.setQueriesData(['party', { id: id }], updatedParty)
      },
    },
    '에러가 발생했습니다.',
  )

  const handleOutParty = () => {
    outMutation.mutate(myMembership?.id)
  }

  const [isEatModalOpen, setEatModalOpen] = useState(false)
  const openEatModal = () => setEatModalOpen(true)

  const keyword = data?.keyword.id
  const review = useInfiniteQuery<PaginatedResult<Review>>(
    ['review', keyword],
    ({ pageParam = 1 }) => listReview(pageParam, keyword),
    {
      enabled: !!keyword,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )
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

  const inviteMutation = useMutationHandleError(
    inviteParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '초대 메시지를 보냈습니다.')
      },
    },
    '초대할 수 없습니다.',
  )
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
                  <button
                    onClick={() => handleOutParty()}
                    className="rounded bg-blue-600 p-2 px-3 text-sm text-white"
                  >
                    나가기
                  </button>
                  <EatModal
                    isOpen={isEatModalOpen}
                    setOpen={setEatModalOpen}
                    domain="party"
                  />
                  {!data.eat && (
                    <button
                      onClick={openEatModal}
                      className="ml-2 rounded bg-pink-500 p-2 px-3 text-sm text-white"
                    >
                      먹었어요
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleJoinParty()}
                  className="rounded bg-blue-600 p-2 px-3 text-sm text-white"
                >
                  같이갈래요
                </button>
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
                        <YLineCard>
                          <div className="flex">
                            <UserAvatar user={item.team_member} />
                            <span className="ml-1">
                              {item.team_member.member_name}
                            </span>
                          </div>
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
