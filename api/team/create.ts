import { authorizedInstance } from 'api/setupAxios'
import { AxiosResponse } from 'axios'
import { ApiResponse } from 'type/api'
import { CreateTeamValue } from 'type/team'

export const createTeam = async (data: CreateTeamValue) => {
  const { data: response }: ApiResponse = await authorizedInstance.post(
    '/group/team/',
    data,
  )
  return response
}
