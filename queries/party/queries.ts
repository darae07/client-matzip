import { listParty, retrieveParty } from '@/api'
import { PaginatedResult, Party, PartyList, TeamMember } from '@/type'
import { useInfiniteQuery, useQuery } from 'react-query'

export const usePartyQuery = (
  category?: number,
  team_profile?: TeamMember | null,
) =>
  useInfiniteQuery<PaginatedResult<PartyList>>(
    ['party', category],
    ({ pageParam = 1 }) => listParty(pageParam, category),
    {
      enabled: !!team_profile,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )

export const usePartyItemQuery = (id?: string | string[]) =>
  useQuery(['partyItem', id], () => retrieveParty<Party>(id), { enabled: !!id })
