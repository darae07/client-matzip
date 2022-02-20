import axios from 'axios'
import httpRequest from 'constants/httpRequest'
import httpRequestCode from 'constants/httpRequestCode'

import jwt_decode from 'jwt-decode'
import { setAccessToken, setRefreshToken } from 'store/modules/auth/token'
import { userLogout } from 'store/modules/auth/user'
import { anonymousInstance } from './setupAxios'

let store: any
const injectStore = (_store: any) => {
  store = _store
}

function finishSession() {
  // 세션 만료 처리
  store.dispatch(userLogout())
  // 로그인 페이지로 이동 필요
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
  const accessToken = store.getState().token.accessToken
  const refreshToken = store.getState().token.refreshToken
  const { login_method } = store.getState().user.user

  const TOKEN_REFRESH_URL = '/auth/token/refresh/'
  const MICROSECOND = 1000
  const ACCESS_TOKEN_EXPIRE_MARGIN_MINUTE = 1
  let now = new Date()
  now.setMinutes(now.getMinutes() + ACCESS_TOKEN_EXPIRE_MARGIN_MINUTE)

  if (accessToken !== null) {
    const ACCESS_TOKEN_EXPIRE = jwt_decode<Token>(accessToken).exp * MICROSECOND
    const ACCESS_TOKEN_EXPIRE_AT = new Date(ACCESS_TOKEN_EXPIRE)
    console.log(ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_EXPIRE_AT)
    if (now < ACCESS_TOKEN_EXPIRE_AT) {
      return accessToken
    }
  }
  if (refreshToken === null) {
    finishSession()
    return null
  }
  const REFRESH_TOKEN_EXPIRE = jwt_decode<Token>(refreshToken).exp * MICROSECOND
  const REFRESH_TOKEN_EXPIRE_AT = new Date(REFRESH_TOKEN_EXPIRE)
  console.log(REFRESH_TOKEN_EXPIRE_AT)
  if (now < REFRESH_TOKEN_EXPIRE_AT) {
    // user 가입 타입에 따라 분기 필요
    if (login_method === 'email') {
      const data = { refresh: refreshToken }
      const response = await anonymousInstance.post(TOKEN_REFRESH_URL, data)
      const { result } = response.data
      if (result) {
        store.dispatch(setAccessToken(result.access))
        return result.access
      }
      if (login_method === 'kakao') {
        const KAKAO_TOKEN_REFRESH_URL = '/common/kakao_token-refresh/'
        const data = { refresh_token: refreshToken }
        const response = await anonymousInstance.post(
          KAKAO_TOKEN_REFRESH_URL,
          data,
        )
        const { result } = response.data
        if (result) {
          const { access_token, refresh_token } = result
          store.dispatch(setAccessToken(access_token))
          if (refresh_token) {
            store.dispatch(setRefreshToken(refresh_token))
          }
          return result.access_token
        }
      }
    } else {
      finishSession()
      return null
    }
  } else {
    finishSession()
    return null
  }
}

export { getAccessToken, injectStore }
