import { inviteParty, joinParty, outParty } from '@/api'
import { openToast } from '@/components'
import { ApiResponseData, Party, PartyMembership, TeamMember } from '@/type'
import { useMutationHandleError } from '@/utils/hooks'
import _ from 'lodash'
import { useQueryClient } from 'react-query'

export const useJoinPartyMutation = (
  setMyMembership: Function,
  id?: string | string[],
  party?: Party | void,
) => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    joinParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '참여 완료')
        setMyMembership(result)
        const membership = party ? party.membership : []
        const updatedParty = { ...party, membership: [...membership, result] }
        queryClient.setQueryData(['partyItem', id], updatedParty)
        queryClient.setQueriesData(['party', { id: id }], updatedParty)
      },
    },
    '참여할 수 없습니다.',
  )
}

export const useOutPartyMutation = (
  setMyMembership: Function,
  id?: string | string[],
  party?: Party | void,
  team_profile?: TeamMember | null,
) => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    outParty,
    {
      onSuccess: (response: ApiResponseData<any>) => {
        const { message, result } = response
        openToast(message || '나가기 완료')
        const membership = party ? party.membership : []
        const updatedParty = {
          ...party,
          membership: _.filter(membership, (e) => {
            return e.team_member.id !== team_profile?.id
          }),
        }
        setMyMembership(undefined)
        queryClient.setQueryData(['partyItem', id], updatedParty)
        queryClient.setQueriesData(['party', { id: id }], updatedParty)
      },
    },
    '에러가 발생했습니다.',
  )
}

export const useInvitePartyMutation = () =>
  useMutationHandleError(
    inviteParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '초대 메시지를 보냈습니다.')
      },
    },
    '초대할 수 없습니다.',
  )
