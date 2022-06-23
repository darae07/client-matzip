import { createVote, deleteVote } from '@/api'
import { openToast } from '@/components/toast'
import { ApiResponseData, Vote } from '@/type'
import { useMutationHandleError } from '@/utils/hooks'
import { useQueryClient } from 'react-query'

export const useCreateVoteMutation = (crewId?: string | string[]) => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    createVote,
    {
      onSuccess: (response: ApiResponseData<Vote>) => {
        const { message, result } = response
        openToast(message || '투표 완료')
        queryClient.invalidateQueries(['lunch', crewId])
      },
    },
    '투표할 수 없습니다.',
  )
}

export const useOutVoteMutation = (crewId?: string | string[]) => {
  const queryClient = useQueryClient()
  return useMutationHandleError(
    deleteVote,
    {
      onSuccess: (response: ApiResponseData<any>) => {
        const { message, result } = response
        openToast(message || '투표 취소')
        queryClient.invalidateQueries(['lunch', crewId])
      },
    },
    '투표를 취소할 수 없습니다.',
  )
}
