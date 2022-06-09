import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, isValidId } from '@/type'

export const retrieveTeamMember = async <ResultT>(id: number | undefined) => {
  try {
    return await isValidId(id)
  } catch (e) {
    console.log(e)
  } finally {
    const { data: response }: ApiResponse<ResultT> =
      await authorizedInstance.get(`group/member/${id}/`)
    return response.result
  }
}
