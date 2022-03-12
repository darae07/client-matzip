import { authorizedInstance } from 'api/setupAxios'
import { ApiResponse } from 'type/api'
import { isValidId } from 'type/validation'

export const listParty = async () => {
  const { data: response }: ApiResponse = await authorizedInstance.get(
    'group/party/',
  )
  return response.result
}

export const listMyParty = async () => {
  const { data: response }: ApiResponse = await authorizedInstance.get(
    'group/party/my_party/',
  )
  return response.result
}
