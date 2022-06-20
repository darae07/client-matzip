import { Fragment, ReactElement, useEffect, useState } from 'react'
import {
  HomeLayout,
  InfiniteScroll,
  ListItem,
  LoadingSpinner,
  UserAvatar,
  WhiteRoundedCard,
  YLineCard,
} from '@/components'
import { NextPageWithLayout, Review, ReviewImage } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { useRouter } from 'next/router'
import { PencilIcon } from '@heroicons/react/outline'
import { useMyReviewQuery } from '@/queries'
import { printDateTimeForToday } from '@/utils'
import Image from 'next/image'
import { KeywordScoreIcon, ReviewDetailModal } from '@/components/modules'

const ProfilePage: NextPageWithLayout = () => {
  const { user } = useAppSelector((state) => state.user)
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.back()
    }
  }, [user])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useMyReviewQuery()

  const [isOpenReviewDetailModal, setOpenReviewDetailModal] = useState(false)
  const [reviewImageId, setReviewImageId] = useState<number>()
  const handleSelectReviewImage = (id: number) => {
    setReviewImageId(id)
    setOpenReviewDetailModal(true)
  }

  return (
    <div>
      {user?.team_profile && (
        <WhiteRoundedCard className="relative mb-4">
          <button
            type="button"
            onClick={() => router.push('/profile/edit')}
            className="borer-gray-400 absolute top-6 right-7 flex items-center rounded-xl border p-2 text-sm text-gray-500"
          >
            <PencilIcon className="mr-1 h-5 w-5" />
            <span>수정</span>
          </button>
          <div className="sm:flex">
            <UserAvatar user={user.team_profile} size="large" />
            <div className="mt-4 sm:ml-4 sm:mt-0">
              <p className="text-2xl font-bold">
                {user.team_profile.member_name}
              </p>
              <p className="">{user.team_profile.title}</p>

              <p className="mt-4">{user.email}</p>
              <p className="">{user.phone_number}</p>
            </div>
          </div>
        </WhiteRoundedCard>
      )}

      {isLoading ? (
        <div className="mt-10 mb-5 flex w-full justify-center">
          <LoadingSpinner width={30} height={30} />
        </div>
      ) : (
        data?.pages && (
          <WhiteRoundedCard className="mt-4">
            <p className="mb-5 text-xl">
              내가 쓴 리뷰
              <span className="ml-1 text-gray-500">
                ({data.pages[0]?.count})
              </span>
            </p>
            <ul>
              {data.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((item: Review) => (
                    <ListItem
                      key={item.id}
                      isPreviousData={isFetching && !isFetchingNextPage}
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
                                alt={image.image}
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
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
            />
            {reviewImageId && (
              <ReviewDetailModal
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

export default ProfilePage

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
