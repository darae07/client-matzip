import {
  acceptInviteParty,
  cancelInviteParty,
  inviteParty,
  joinParty,
  outParty,
  refuseInviteParty,
} from '@/api'
import { openToast } from '@/components'
import { ApiResponseData, Party, PartyMembership, TeamMember } from '@/type'
import { useAppSelector, useMutationHandleError } from '@/utils/hooks'
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
) => {
  const queryClient = useQueryClient()
  const { isLoading, user } = useAppSelector((state) => state.user)

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
            return e.team_member.id !== user?.team_profile?.id
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

export const useAcceptInvitePartyMutation = () => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    acceptInviteParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '초대를 수락했습니다.')
        queryClient.invalidateQueries('myPartyInvite')
        queryClient.invalidateQueries('partyItem')
      },
    },
    '초대를 수락할 수 없습니다.',
  )
}

export const useRefuseInvitePartyMutation = () => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    refuseInviteParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '초대를 거절했습니다.')
        queryClient.invalidateQueries('myPartyInvite')
        queryClient.invalidateQueries('partyItem')
      },
    },
    '초대를 거절할 수 없습니다.',
  )
}

export const useCancelInvitePartyMutation = () => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    cancelInviteParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '초대 요청을 취소했습니다.')
        queryClient.invalidateQueries('myPartyInvite')
        queryClient.invalidateQueries('partyItem')
      },
    },
    '요청을 취소할 수 없습니다.',
  )
}
