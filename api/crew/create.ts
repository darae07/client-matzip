import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, CreateCrewValue } from '@/type'

export const createCrew = async <ResultT>(data: CreateCrewValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/crew', data)
  return response
}
