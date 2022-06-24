import _ from 'lodash'
import { closeLunchWithReview } from '@/api'
import { openToast } from '@/components'
import { ApiResponseData, Lunch, Party } from '@/type'
import { useMutationHandleError } from '@/utils/hooks'
import { useQueryClient } from 'react-query'

export const useCloseLunchWithReviewMutation = (
  closeModal: Function,
  setIsSubmitting: Function,
) => {
  const queryClient = useQueryClient()

  return useMutationHandleError(
    closeLunchWithReview,
    {
      onSuccess: (data: ApiResponseData<Lunch>) => {
        const { message, result } = data
        openToast(message || '식사 리뷰를 등록했습니다.')
        queryClient.invalidateQueries('lunch')
        closeModal()
      },
      onSettled: (data: ApiResponseData<Party>) => {
        setIsSubmitting(false)
      },
    },
    '식사 리뷰를 등록할 수 없습니다.',
  )
}
