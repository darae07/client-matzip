import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Modal, UserAvatar } from '@/components'
import { useInfiniteQuery } from 'react-query'
import { listReview } from '@/api'
import { PaginatedResult, Review } from '@/type'
import Image from 'next/image'
import { printDateTimeForToday } from '@/utils/value'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

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

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
  } = useInfiniteQuery<PaginatedResult<Review>>(
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
      return [...acc, ...val.results.filter((review) => review.images)]
    },
    [],
  )
  const firstReview = _.head(allReviews)
  const lastReview = _.last(allReviews)

  const currentReivew = allReviews?.find((review) =>
    review.images?.find((image) => image.id === currentReviewImageId),
  )
  const currentReivewImage = currentReivew?.images?.find(
    (image) => image.id === currentReviewImageId,
  )

  useEffect(() => {
    setCurrentReviewImageId(reviewImageId)
  }, [reviewImageId])

  const handleNextPage = () => {
    if (!currentReivew || !allReviews) return
    const currentReivewImageIndex = _.indexOf(
      currentReivew.images,
      currentReivewImage,
    )
    const imageLength = currentReivew.images?.length || 0
    if (currentReivewImageIndex < imageLength - 1 && currentReivew.images) {
      const nextImage = currentReivew.images[currentReivewImageIndex + 1]
      setCurrentReviewImageId(nextImage.id)
      return
    }
    if (
      currentReivew.id === lastReview?.id &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
      return
    }
    const currentReivewIndex = _.indexOf(allReviews, currentReivew)
    const nextReview = allReviews
      .slice(currentReivewIndex + 1)
      .find((review) => review.images)
    if (nextReview?.images) {
      setCurrentReviewImageId(nextReview.images[0].id)
    }
  }
  const handlePrevPage = () => {
    if (!currentReivew || !allReviews) return
    const currentReivewImageIndex = _.indexOf(
      currentReivew.images,
      currentReivewImage,
    )
    if (currentReivewImageIndex > 0 && currentReivew.images) {
      const prevImage = currentReivew.images[currentReivewImageIndex - 1]
      setCurrentReviewImageId(prevImage.id)
      return
    }
    if (currentReivew.id === firstReview?.id) return

    const currentReivewIndex = _.indexOf(allReviews, currentReivew)
    const prevReview = allReviews
      .slice(0, currentReivewIndex)
      .find((review) => review.images)
    if (prevReview?.images) {
      setCurrentReviewImageId(
        prevReview.images[prevReview.images.length - 1].id,
      )
    }
  }

  return (
    <Modal handleClose={closeModal} isOpen={isOpen} size="large">
      <div className="flex h-[90vh] flex-col md:flex-row">
        <div className="relative mb-4 h-[50vh] w-full md:h-[75vh]">
          <ChevronLeftIcon
            onClick={handlePrevPage}
            className="absolute top-1/2 z-10 h-10 w-10 text-gray-400 hover:cursor-pointer"
          />
          <div className="relative mb-4 h-[50vh] w-full md:h-[75vh]">
            {currentReivewImage && (
              <Image
                src={currentReivewImage.image}
                alt={currentReivewImage.image}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <ChevronRightIcon
            onClick={handleNextPage}
            className="absolute right-0 top-1/2 z-10 h-10 w-10 text-gray-400 hover:cursor-pointer"
          />
          <div className="hidden md:flex">
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
