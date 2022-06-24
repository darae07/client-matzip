import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, isValidId } from '@/type'

export const listCrew = async <ResultT>(page: number = 1) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    '/group/crew/my_crew/',
    {
      params: {
        page,
      },
    },
  )
  return response.result
}

export const retrieveCrew = async <ResultT>(
  id: string | string[] | undefined,
) => {
  try {
    return await isValidId(id)
  } catch (e) {
    console.log(e)
  } finally {
    const { data: response }: ApiResponse<ResultT> =
      await authorizedInstance.get(`/group/crew/${id}/`)
    return response.result
  }
}
