import _ from 'lodash'
import { useEffect } from 'react'
import { MutationFunction, useMutation } from 'react-query'
import { openToast } from 'store/modules/ui/toast'
import { ApiErrorResponse, ApiResponseData } from 'type/api'
import { useAppDispatch } from './redux'

const useMutationHandleError = (
  func: (data: any) => Promise<ApiResponseData>,
  variables: Object,
  errorMessage: string = '에러가 발생했습니다.',
) => {
  const dispatch = useAppDispatch()
  const mutation = useMutation<ApiResponseData, ApiErrorResponse, any>(
    func,
    variables,
  )

  useEffect(() => {
    if (mutation.error) {
      const { message } = mutation.error.response.data
      dispatch(openToast(_.isString(message) ? message : errorMessage))
    }
  }, [mutation.error])
  return mutation
}

export default useMutationHandleError