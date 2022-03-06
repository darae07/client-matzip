import { AxiosResponse, AxiosError } from 'axios'

export interface ApiResponse extends AxiosResponse {
  data: ApiResponseData
}

export interface ApiResponseData {
  result: any
  message: null | string
  success: boolean
}

export interface ApiErrorResponse extends AxiosError {
  response: ApiResponse
}
