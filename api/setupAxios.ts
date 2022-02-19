import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import httpRequest from 'constants/httpRequest'
import { getAccessToken } from './api'

const anonymousInstance = axios.create({
  baseURL: httpRequest.SERVICE_BASE_URL + 'api',
})
const authorizedInstance = axios.create({
  baseURL: httpRequest.SERVICE_BASE_URL + 'api',
})
authorizedInstance.interceptors.request.use((config: any) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

export { anonymousInstance, authorizedInstance }
