import {
  acceptInviteCrew,
  cancelInviteCrew,
  editCrew,
  inviteCrew,
  outCrew,
  refuseInviteCrew,
} from '@/api'
import { openToast } from '@/components'
import { ApiResponseData, Crew, CrewMembership } from '@/type'
import { useAppSelector, useMutationHandleError } from '@/utils/hooks'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'

export const useUpdateCrewMutation = () => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    editCrew,
    {
      onSuccess: (response: ApiResponseData<Crew>) => {
        const { message, result } = response
        openToast(message || '크루 정보를 저장했습니다.')
        queryClient.invalidateQueries('crewItem')
      },
    },
    '크루 정보를 업데이트할 수 없습니다.',
  )
}

export const useOutCrewMutation = (
  setMyMembership: Function,
  id?: string | string[],
) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutationHandleError(
    outCrew,
    {
      onSuccess: (response: ApiResponseData<any>) => {
        const { message, result } = response
        openToast(message || '나가기 완료')
        setMyMembership(undefined)
        queryClient.invalidateQueries(['crewItem', id])
        queryClient.invalidateQueries(['crew'])
        router.back()
      },
    },
    '크루를 탈퇴할 수 없습니다.',
  )
}

export const useInviteCrewMutation = () =>
  useMutationHandleError(
    inviteCrew,
    {
      onSuccess: (response: ApiResponseData<CrewMembership>) => {
        const { message, result } = response
        openToast(message || '초대 메시지를 보냈습니다.')
      },
    },
    '초대할 수 없습니다.',
  )

export const useAcceptInviteCrewMutation = () => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    acceptInviteCrew,
    {
      onSuccess: (response: ApiResponseData<CrewMembership>) => {
        const { message, result } = response
        openToast(message || '초대를 수락했습니다.')
        queryClient.invalidateQueries('myCrewInvite')
        queryClient.invalidateQueries('crewItem')
      },
    },
    '초대를 수락할 수 없습니다.',
  )
}

export const useRefuseInviteCrewMutation = () => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    refuseInviteCrew,
    {
      onSuccess: (response: ApiResponseData<CrewMembership>) => {
        const { message, result } = response
        openToast(message || '초대를 거절했습니다.')
        queryClient.invalidateQueries('myCrewInvite')
        queryClient.invalidateQueries('crewItem')
      },
    },
    '초대를 거절할 수 없습니다.',
  )
}

export const useCancelInviteCrewMutation = () => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    cancelInviteCrew,
    {
      onSuccess: (response: ApiResponseData<CrewMembership>) => {
        const { message, result } = response
        openToast(message || '초대 요청을 취소했습니다.')
        queryClient.invalidateQueries('myCrewInvite')
        queryClient.invalidateQueries('crewItem')
      },
    },
    '요청을 취소할 수 없습니다.',
  )
}
