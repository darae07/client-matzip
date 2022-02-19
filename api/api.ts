import axios from 'axios'
import httpRequest from 'constants/httpRequest'
import httpRequestCode from 'constants/httpRequestCode'

import jwt_decode from 'jwt-decode'
import { setAccessToken } from 'store/modules/auth/token'

function finishSession() {
  // 세션 만료 처리
}

interface Token {
  name: string
  exp: number
}

interface TokenRefresh {
  access: string
  access_token_expiration: string
}

async function getAccessToken() {
  const accessToken = ''
  const refreshToken = ''
  const TOKEN_REFRESH_URL = '/auth/token/refresh/'
  const MICROSECOND = 1000
  const ACCESS_TOKEN_EXPIRE_MARGIN_MINUTE = 1
  let now = new Date()
  now.setMinutes(now.getMinutes() + ACCESS_TOKEN_EXPIRE_MARGIN_MINUTE)

  if (accessToken !== null) {
    const ACCESS_TOKEN_EXPIRE = jwt_decode<Token>(accessToken).exp * MICROSECOND
    const ACCESS_TOKEN_EXPIRE_AT = new Date(ACCESS_TOKEN_EXPIRE)
    if (now < ACCESS_TOKEN_EXPIRE_AT) {
      return accessToken
    }
  }
  if (refreshToken === null) {
    finishSession()
    return null
  }
  const REFRESH_TOKEN_EXPIRE = jwt_decode<Token>(refreshToken).exp
  const REFRESH_TOKEN_EXPIRE_AT = new Date(REFRESH_TOKEN_EXPIRE)
  if (now < REFRESH_TOKEN_EXPIRE_AT) {
    // user 가입 타입에 따라 분기 필요
    const data = { refresh: refreshToken }
    const response = await axios.post(TOKEN_REFRESH_URL, data)
    const { result } = response.data
    if (result) {
      // const dispatch = useAppDispatch()
      // dispatch(setAccessToken(result.access))
      return result.access
    } else {
      finishSession()
      return null
    }
  } else {
    finishSession()
    return null
  }
}

export { getAccessToken }
