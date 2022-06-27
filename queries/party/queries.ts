import { listParty, myInviteList, retrieveParty } from '@/api'
import {
  ApiErrorResponse,
  PaginatedResult,
  Party,
  PartyList,
  PartyMembership,
} from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { useInfiniteQuery, useQuery } from 'react-query'

export const usePartyQuery = (category?: number) => {
  const { isLoading, user } = useAppSelector((state) => state.user)
  return useInfiniteQuery<
    PaginatedResult<PartyList>,
    ApiErrorResponse<PartyList>
  >(
    ['party', category],
    ({ pageParam = 1 }) => listParty(pageParam, category),
    {
      enabled: !!user?.team_profile,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )
}

export const usePartyItemQuery = (id?: string | string[]) =>
  useQuery<void | Party, ApiErrorResponse<Party>>(
    ['partyItem', id],
    () => retrieveParty<Party>(id),
    { enabled: !!id },
  )

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
