import { authorizedInstance } from '@/api/setupAxios'
import { ApiResponse, isValidId, CreateLunchValue } from '@/type'
import httpRequest from '@/constants/httpRequest'

export const listLunch = async <ResultT>(
  page: number = 1,
  crew?: string | string[],
) => {
  const { data: response }: ApiResponse<ResultT> = await authorizedInstance.get(
    '/group/lunch/',
    {
      params: {
        page,
        crew,
      },
    },
  )
  return response.result
}

export const retrieveLunch = async <ResultT>(
  id: string | string[] | undefined,
) => {
  try {
    return await isValidId(id)
  } catch (e) {
    console.log(e)
  } finally {
    const { data: response }: ApiResponse<ResultT> =
      await authorizedInstance.get(`/group/lunch/${id}/`)
    return response.result
  }
}

export const createLunch = async <ResultT>(data: CreateLunchValue) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post('/group/lunch/', data)
  return response
}

interface FormDataProps {
  id: string
  data: FormData
}
export const closeLunchWithReview = async <ResultT>({
  id,
  data,
}: FormDataProps) => {
  const { data: response }: ApiResponse<ResultT> =
    await authorizedInstance.post(
      `/group/lunch/${id}/close_with_review/`,
      data,
      {
        headers: {
          'Content-Type': httpRequest.REQUEST_HEADER_CONTENTS_MULTIPART_FORM,
        },
      },
    )
  return response
}
