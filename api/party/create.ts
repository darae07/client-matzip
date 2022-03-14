import { authorizedInstance } from 'api/setupAxios'
import { ApiResponse } from 'type/api'
import { CreatePartyValue } from 'type/party'

export const createParty = async <ResultT>(data: CreatePartyValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/party/', data)
  return response
}
