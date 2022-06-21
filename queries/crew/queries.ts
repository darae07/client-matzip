import { listCrew, retrieveCrew } from '@/api'
import { PaginatedResult, Crew } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { useInfiniteQuery, useQuery } from 'react-query'

export const useCrewQuery = () => {
  const { user } = useAppSelector((state) => state.user)
  return useInfiniteQuery<PaginatedResult<Crew>>(
    ['crew'],
    ({ pageParam = 1 }) => listCrew(pageParam),
    {
      enabled: !!user?.team_profile,
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )
}

export const useCrewItemQuery = (id?: string | string[]) =>
  useQuery(['crewItem', id], () => retrieveCrew<Crew>(id), { enabled: !!id })
