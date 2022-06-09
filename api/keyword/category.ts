import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse } from '@/type/api'

export const listCategory = async <ResultT>() => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    'store/category/',
  )
  return response.result
}
