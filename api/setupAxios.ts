import axios from 'axios'
import httpRequest from '@/constants/httpRequest'
import { openToast } from '@/components'
import { getAccessToken } from './api'

const anonymousInstance = axios.create({
  baseURL: httpRequest.SERVICE_BASE_URL + 'api',
})
const authorizedInstance = axios.create({
  baseURL: httpRequest.SERVICE_BASE_URL + 'api',
})

const setupAxiosInterceptors = (store: any, router: any) => {
  authorizedInstance.interceptors.request.use(
    async (config: any) => {
      try {
        const accessToken = await getAccessToken()
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        } else {
          throw new axios.Cancel('로그인이 필요합니다.')
        }
        return config
      } catch (error: any) {
        router.push(`/login/?returnPath=${router.asPath}`)
        openToast(error.message)
        return Promise.reject({ response: { data: { error } } })
      }
    },
    (error) => {
      return Promise.reject({ response: { data: { error } } })
    },
  )
}

export { anonymousInstance, authorizedInstance, setupAxiosInterceptors }
