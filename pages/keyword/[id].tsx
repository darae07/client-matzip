import _ from 'lodash'
import {
  HomeLayout,
  InfiniteScroll,
  ListItem,
  LoadingSpinner,
  openToast,
  UserAvatar,
  WhiteRoundedCard,
  YLineCard,
} from '@/components'
import { useKeywordItemQuery, useMyTeamQuery, useReviewQuery } from '@/queries'
import { NextPageWithLayout, Review, ReviewImage } from '@/type'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import {
  CategoryName,
  KakaoMap,
  KeywordScore,
  KeywordScoreIcon,
  ReviewDetailModal,
} from '@/components/modules'
import { calculatePercent, printDateTimeForToday } from '@/utils'
import { useAppSelector } from '@/utils/hooks'
import Image from 'next/image'

const KeywordDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router
  const queryClient = useQueryClient()

  const { data, error, isLoading } = useKeywordItemQuery(id)

  useEffect(() => {
    if (error) {
      openToast(error.response.data.message || '맛집을 찾을 수 없습니다.')
      if (!isLoading) {
        router.back()
      }
    }
  }, [error, isLoading, router])

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const myTeam = useMyTeamQuery(teamId)

  const review = useReviewQuery(data?.id)
  const reviewData = review.data
  const [isOpenReviewDetailModal, setOpenReviewDetailModal] = useState(false)
  const [reviewImageId, setReviewImageId] = useState<number>()
  const handleSelectReviewImage = (id: number) => {
    setReviewImageId(id)
    setOpenReviewDetailModal(true)
  }

  if (data) {
    return (
      <div>
        <WhiteRoundedCard className="mb-4">
          {reviewData?.pages && (
            <div className="mb-2 flex overflow-x-auto">
              {reviewData.pages[0].results.map((item: Review) =>
                item.images?.map((image) => (
                  <div
                    className="mr-1 shrink-0 hover:cursor-pointer"
                    key={image.id}
                    onClick={() => {
                      handleSelectReviewImage(image.id)
                    }}
                  >
                    <Image
                      src={image.image}
                      alt={data.category?.name}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </div>
                )),
              )}
            </div>
          )}
          <div className="mb-4 flex items-center">
            <CategoryName category={data.category} className="mr-2" />
            <p className="text-2xl font-bold ">{data.name}</p>
            <KeywordScore keyword={data} className="ml-3" />
          </div>

          <div className="mt-1 text-sm">
            <p>맛집 인기도</p>
            <p>오늘의 메뉴에 등록된 횟수: {data.hit_count}</p>
            <p>동료들이 식사한 횟수: {data.eat_count}</p>
            <p>
              맛있다 비율:
              {calculatePercent(data.good_count, data.eat_count)}%
            </p>
          </div>
        </WhiteRoundedCard>

        {myTeam.data && (
          <WhiteRoundedCard className="h-72">
            <KakaoMap location={myTeam.data.location} keyword={data} />
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
                                  alt={data.category?.name}
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
                  reviews={review}
                  reviewImageId={reviewImageId}
                  isOpen={isOpenReviewDetailModal}
                  setIsOpen={setOpenReviewDetailModal}
                />
              )}
            </WhiteRoundedCard>
          )
        )}
      </div>
    )
  }
  return <div></div>
}

export default KeywordDetail
KeywordDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
