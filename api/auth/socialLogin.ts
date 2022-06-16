import { Dispatch } from 'react'
import { GoogleLoginResponse } from 'react-google-login'
import { anonymousInstance } from '@/api/setupAxios'
import { userLoginStart } from '@/store/modules'
import { loginSuccess, loginFail } from './login'

export const kakaoLogin =
  (response: any) => async (dispatch: Dispatch<object>) => {
    try {
      dispatch(userLoginStart())
      const loginResponse = await anonymousInstance.get(
        '/common/kakao-callback/',
        {
          headers: {
            Authorization: response.response.access_token,
          },
        },
      )
      const { result, message, success } = loginResponse.data
      if (success) {
        dispatch(loginSuccess(result))
      } else {
        dispatch(loginFail(message || '카카오 인증에 실패했습니다.'))
      }
    } catch {
      dispatch(loginFail('카카오 인증에 실패했습니다.'))
    }
  }

export const googleLogin =
  (response: GoogleLoginResponse) => async (dispatch: Dispatch<object>) => {
    try {
      dispatch(userLoginStart())
      const loginResponse = await anonymousInstance.get(
        '/common/google-callback/',
        {
          headers: {
            Authorization: response.tokenId,
          },
        },
      )
      const { result, message, success } = loginResponse.data
      if (success) {
        dispatch(loginSuccess(result))
      } else {
        dispatch(loginFail(message || '구글 인증에 실패했습니다.'))
      }
    } catch {
      dispatch(loginFail('구글 인증에 실패했습니다.'))
    }
  }
