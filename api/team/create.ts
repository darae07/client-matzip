import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse } from '@/type/api'
import { CreateTeamValue } from '@/type/team'

export const createTeam = async <ResultT>(data: CreateTeamValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/team/', data)
  return response
}
