import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, JoinCrewValue, InviteCrewValue } from '@/type'

export const joinCrew = async <ResultT>(data: JoinCrewValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/crew_membership/join/', data)
  return response
}

export const outCrew = async <ResultT>(id: number | string) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.delete(`/group/crew_membership/${id}/`)
  return response
}

export const inviteCrew = async <ResultT>(values: InviteCrewValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/crew_membership/invite/', values)
  return response
}

export const myInviteCrewList = async <ResultT>(page: number = 1) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    '/group/crew_membership/my_invite_list/',
    {
      params: {
        page,
      },
    },
  )
  return response.result
}

export const acceptInviteCrew = async <ResultT>(id: number) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`/group/crew_membership/${id}/accept/`)
  return response
}

export const refuseInviteCrew = async <ResultT>(id: number) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`/group/crew_membership/${id}/refuse/`)
  return response
}

export const cancelInviteCrew = async <ResultT>(id: number) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`/group/crew_membership/${id}/cancel/`)
  return response
}
