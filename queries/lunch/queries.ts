import { listLunch } from '@/api'
import { PaginatedResult, LunchList } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { useInfiniteQuery } from 'react-query'

export const useLunchQuery = (crewId?: string | string[]) => {
  const { user } = useAppSelector((state) => state.user)
  return useInfiniteQuery<PaginatedResult<LunchList>>(
    ['lunch', crewId],
    ({ pageParam = 1 }) => listLunch(pageParam, crewId),
    {
      enabled: !!user?.team_profile && !!crewId,
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )
}
