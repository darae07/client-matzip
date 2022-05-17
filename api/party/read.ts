import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse } from '@/type/api'
import { isValidId } from '@/type/validation'

export const listParty = async <ResultT>() => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    'group/party/',
  )
  return response.result
}

export const listMyParty = async <ResultT>() => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    'group/party/my_party/',
  )
  return response.result
}

export const retrieveParty = async <ResultT>(
  id: string | string[] | undefined,
) => {
  try {
    return await isValidId(id)
  } catch (e) {
    console.log(e)
  } finally {
    const { data: response }: ApiResponse<ResultT> =
      await authorizedInstance.get(`group/party/${id}/`)
    return response.result
  }
}
