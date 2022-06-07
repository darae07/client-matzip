import { useEffect, useState } from 'react'
import { Modal, UserAvatar } from '@/components'
import { useInfiniteQuery } from 'react-query'
import { listReview } from '@/api'
import { PaginatedResult, Review } from '@/type'
import Image from 'next/image'
import { printDateTimeForToday } from '@/utils/value'

interface Props {
  reviewImageId?: number
  keyword?: number
  isOpen: boolean
  setIsOpen: Function
}
export const ReviewDetailModal = ({
  reviewImageId,
  keyword,
  isOpen,
  setIsOpen,
}: Props) => {
  const closeModal = () => setIsOpen(false)

  const { data, isLoading, isFetchingNextPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery<PaginatedResult<Review>>(
      ['review', keyword],
      ({ pageParam = 1 }) => listReview(pageParam, keyword),
      {
        enabled: !!keyword,
        keepPreviousData: true,
        getNextPageParam: (listPage, pages) => listPage.next,
        cacheTime: 1000 * 60 * 60,
      },
    )
  const [currentReviewImageId, setCurrentReviewImageId] =
    useState(reviewImageId)
  const allReviews = data?.pages.reduce(
    (acc: Review[], val: PaginatedResult<Review>) => {
      return [...acc, ...val.results]
    },
    [],
  )
  const currentReivew = allReviews?.find((review) =>
    review.images?.find((image) => image.id === currentReviewImageId),
  )
  const currentReivewImage = currentReivew?.images?.find(
    (image) => image.id === currentReviewImageId,
  )
  console.log(currentReivew)

  useEffect(() => {
    setCurrentReviewImageId(reviewImageId)
  }, [reviewImageId])

  return (
    <Modal handleClose={closeModal} isOpen={isOpen} size="large">
      <div className="flex h-[90vh] flex-col md:flex-row">
        <div className="h-[75vh] w-full">
          <div className="relative h-[75vh] w-full">
            {currentReivewImage && (
              <Image
                src={currentReivewImage.image}
                alt={currentReivewImage.image}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div className="mt-4 hidden md:flex">
            {data?.pages.map((page) =>
              page.results.map((review) =>
                review.images?.map((image) => (
                  <div
                    key={image.id}
                    className="mr-2"
                    onClick={() => setCurrentReviewImageId(image.id)}
                  >
                    <Image
                      src={image.image}
                      alt={image.image}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </div>
                )),
              ),
            )}
          </div>
        </div>

        {currentReivew && (
          <div className="w-full md:w-[19rem]">
            <div className="flex">
              <UserAvatar user={currentReivew.team_member} />
              <span className="ml-1">
                {currentReivew.team_member.member_name}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {printDateTimeForToday(currentReivew.created_at)}
            </p>
            <p className="my-4">{currentReivew.content}</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
