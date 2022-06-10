import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, joinPartyValue, InvitePartyValue } from '@/type'

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

export const inviteParty = async <ResultT>(values: InvitePartyValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('group/party_membership/invite/', values)
  return response
}

export const myInviteList = async <ResultT>(page: number = 1) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    'group/party_membership/my_invite_list/',
    {
      params: {
        page,
      },
    },
  )
  return response.result
}

export const acceptInviteParty = async <ResultT>(id: number) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`group/party_membership/${id}/accept/`)
  return response
}

export const refuseInviteParty = async <ResultT>(id: number) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`group/party_membership/${id}/refuse/`)
  return response
}

export const cancelInviteParty = async <ResultT>(id: number) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`group/party_membership/${id}/cancel/`)
  return response
}
