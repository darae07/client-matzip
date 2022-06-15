import { searchTeamMember } from '@/api'
import { TeamMember, PaginatedResult } from '@/type'
import { useInfiniteQuery } from 'react-query'

export const useSearchMemberQuery = (search?: string, party?: number) =>
  useInfiniteQuery<PaginatedResult<TeamMember>>(
    ['member', search, party],
    ({ pageParam = 1 }) => searchTeamMember(pageParam, search, party),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )
