import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse } from '@/type/api'
import { isValidId } from '@/type/validation'

export const retrieveKeyword = async <ResultT>(id?: string | string[]) => {
  try {
    return await isValidId(id)
  } catch (e) {
    console.log(e)
  } finally {
    const { data: response }: ApiResponse<ResultT> =
      await authorizedInstance.get(`/store/keyword/${id}/`)
    return response.result
  }
}
