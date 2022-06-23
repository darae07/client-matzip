import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, isValidId } from '@/type'

export const listLunch = async <ResultT>(
  page: number = 1,
  crew?: string | string[],
) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    '/group/lunch/',
    {
      params: {
        page,
        crew,
      },
    },
  )
  return response.result
}

export const retrieveLunch = async <ResultT>(
  id: string | string[] | undefined,
) => {
  try {
    return await isValidId(id)
  } catch (e) {
    console.log(e)
  } finally {
    const { data: response }: ApiResponse<ResultT> =
      await authorizedInstance.get(`/group/lunch/${id}/`)
    return response.result
  }
}
