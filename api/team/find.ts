import { authorizedInstance } from 'api/setupAxios'
import { ApiResponse } from 'type/api'
import { FindTeamValue } from 'type/team'

export const findTeamByCode = async <ResultT>(data: FindTeamValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/team/find/', data)
  return response
}
