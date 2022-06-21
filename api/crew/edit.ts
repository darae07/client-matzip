import { authorizedInstance } from '@/api/setupAxios'
import httpRequest from '@/constants/httpRequest'
import { ApiResponse } from '@/type'

export const editCrew = async <ResultT>({
  id,
  data,
}: {
  id: string
  data: FormData
}) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(`/group/crew/${id}/upload_image/`, data, {
      headers: {
        'Content-Type': httpRequest.REQUEST_HEADER_CONTENTS_MULTIPART_FORM,
      },
    })
  return response
}
