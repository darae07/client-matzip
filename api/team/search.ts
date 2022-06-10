import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse } from '@/type'

export const searchTeamMember = async <ResultT>(
  page: number = 1,
  member_name?: string,
  party?: number,
) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    'group/member/search/',
    {
      params: {
        party,
        member_name,
        page,
      },
    },
  )
  return response.result
}
