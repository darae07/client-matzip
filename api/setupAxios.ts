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
authorizedInstance.interceptors.request.use(async (config: any) => {
  const accessToken = await getAccessToken()
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

export { anonymousInstance, authorizedInstance }
