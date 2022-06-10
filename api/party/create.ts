import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, CreatePartyValue } from '@/type'

export const createParty = async <ResultT>(data: CreatePartyValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/party/', data)
  return response
}
