import { authorizedInstance } from 'api/setupAxios'
import { ApiResponse } from 'type/api'
import { CreateMembershipValue } from 'type/team'

export const joinTeam = async <ResultT>(data: CreateMembershipValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/member/', data)
  return response
}
