import { listLunch } from '@/api'
import { PaginatedResult, Lunch } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { useInfiniteQuery } from 'react-query'

export const useLunchQuery = (crewId: number) => {
  const { user } = useAppSelector((state) => state.user)
  return useInfiniteQuery<PaginatedResult<Lunch>>(
    ['lunch'],
    ({ pageParam = 1 }) => listLunch(pageParam, crewId),
    {
      enabled: !!user?.team_profile,
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )
}
