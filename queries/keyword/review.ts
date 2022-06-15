import { listReview } from '@/api/keyword'
import { PaginatedResult, Review } from '@/type'
import { useInfiniteQuery } from 'react-query'

export const useReviewQuery = (keyword?: number) =>
  useInfiniteQuery<PaginatedResult<Review>>(
    ['review', keyword],
    ({ pageParam = 1 }) => listReview(pageParam, keyword),
    {
      enabled: !!keyword,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )
