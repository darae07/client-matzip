import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse } from '@/type/api'

export const listReview = async <ResultT>(
  page: number = 1,
  keyword?: number,
) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    'review/review/',
    {
      params: {
        keyword,
        page,
      },
    },
  )
  return response.result
}
