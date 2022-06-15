import { listParty, myInviteList, retrieveParty } from '@/api'
import {
  PaginatedResult,
  Party,
  PartyList,
  PartyMembership,
  TeamMember,
} from '@/type'
import { useAppSelector } from '@/utils/hooks'
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

export const useMyPartyInvitedQuery = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)
  return useInfiniteQuery<PaginatedResult<PartyMembership>>(
    ['myPartyInvite'],
    ({ pageParam = 1 }) => myInviteList(pageParam),
    {
      enabled: !!user?.team_profile,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 60,
    },
  )
}
