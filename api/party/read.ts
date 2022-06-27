import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, isValidId } from '@/type'

export const listParty = async <ResultT>(
  page: number = 1,
  category?: number,
) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    `group/party/`,
    {
      params: {
        category,
        page,
      },
    },
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
