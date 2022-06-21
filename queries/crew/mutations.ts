import { editCrew } from '@/api/crew'
import { openToast } from '@/components'
import { ApiResponseData } from '@/type/api'
import { Crew } from '@/type/crew'
import { useMutationHandleError } from '@/utils/hooks'
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
