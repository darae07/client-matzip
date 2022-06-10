import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, ReviewCreateValue } from '@/type'
import httpRequest from '@/constants/httpRequest'

export const closeParty = async <ResultT>(id: string) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`/group/party/${id}/close/`)
  return response
}

interface FormDataProps {
  id: string
  data: FormData
}
export const closePartyWithReview = async <ResultT>({
  id,
  data,
}: FormDataProps) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(
      `/group/party/${id}/close_with_review/`,
      data,
      {
        headers: {
          'Content-Type': httpRequest.REQUEST_HEADER_CONTENTS_MULTIPART_FORM,
        },
      },
    )
  return response
}
