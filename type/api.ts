import { AxiosResponse, AxiosError } from 'axios'

export interface ApiResponse<ResultT> extends AxiosResponse {
  data: ApiResponseData<ResultT>
}

export interface ApiResponseData<ResultT> {
  result: ResultT
  message: null | string
  success: boolean
}

export interface ApiErrorResponse<ResultT> extends AxiosError {
  response: ApiResponse<ResultT>
}

export type PaginatedResult<ResultT> = {
  count: number
  next: null | number
  previous: null | number
  results: Array<ResultT>
}
