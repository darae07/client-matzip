import { findTeamByCode, joinTeam } from '@/api'
import { openToast } from '@/components'
import { setUserTeamProfile } from '@/store/modules'
import { ApiResponseData, Team, TeamMember } from '@/type'
import { useAppDispatch, useMutationHandleError } from '@/utils/hooks'
import { useQueryClient } from 'react-query'

export const useFindTeamMutation = () => {
  const queryClient = useQueryClient()

  return useMutationHandleError(
    findTeamByCode,
    {
      onSuccess: (data: ApiResponseData<Team>) => {
        const { message, result } = data
        // dispatch(openToast(message || '회사를 찾았습니다.'))
        queryClient.setQueryData(['foundTeam'], result)
      },
    },
    '회사를 찾을 수 없습니다.',
  )
}

export const useJoinTeamMutation = (closeModal: Function) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  return useMutationHandleError<TeamMember>(
    joinTeam,
    {
      onSuccess: (data: ApiResponseData<TeamMember>) => {
        const { message, result } = data
        openToast(message || '회사에 가입했습니다.')
        dispatch(setUserTeamProfile(result))
        queryClient.invalidateQueries('foundTeam')
        closeModal()
      },
    },
    '회사에 가입할 수 없습니다.',
  )
}
