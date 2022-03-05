import { authorizedInstance } from 'api/setupAxios'
import { ApiResponse } from 'type/api'

export const retrieveTeam = async (teamId: number | undefined) => {
  try {
    return await isValidId(teamId)
  } catch (e) {
    console.log(e)
  } finally {
    const { data: response }: ApiResponse = await authorizedInstance.get(
      `/group/team/${teamId}/`,
    )
    return response
  }
}
