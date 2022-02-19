import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import httpRequest from 'constants/httpRequest'
import { getAccessToken } from './api'

axios.defaults.baseURL = httpRequest.SERVICE_BASE_URL + 'api'

const authorizedInstance = axios.create()
authorizedInstance.interceptors.request.use((config: any) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

export { authorizedInstance }
