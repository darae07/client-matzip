import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, ReviewCreateValue, ReviewScore } from '@/type'
import httpRequest from '@/constants/httpRequest'

interface ClosePartyData {
  score?: ReviewScore
}
export const closeParty = async <ResultT>(
  id: string,
  data?: ClosePartyData,
) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`/group/party/${id}/close/`, data)
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
