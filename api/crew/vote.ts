import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, CreateVoteValue } from '@/type'

export const createVote = async <ResultT>(data: CreateVoteValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/vote/', data)
  return response
}

export const deleteVote = async <ResultT>(lunch: number) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.delete(`/group/vote/out_by_lunch/`, {
      params: { lunch },
    })
  return response
}
