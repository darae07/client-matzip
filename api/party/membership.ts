import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse } from '@/type/api'
import { joinPartyValue } from '@/type/party'

export const joinParty = async <ResultT>(data: joinPartyValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/party_membership/join/', data)
  return response
}

export const outParty = async <ResultT>(id: number | string) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.delete(`/group/party_membership/${id}/`)
  return response
}
