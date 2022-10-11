import { Dispatch } from 'react'
import { GoogleLoginResponse } from 'react-google-login'
import { anonymousInstance } from '@/api/setupAxios'
import { userLoginStart } from '@/store/modules'
import { loginSuccess, loginFail } from './login'
import { KAKAO_USERINFO_ERROR } from '@/constants/errorCode'

const KAKAO_EMAIL_SCOPE = 'account_email'

export const kakaoLoginCallback =
  (response: any) => async (dispatch: Dispatch<object>) => {
    try {
      dispatch(userLoginStart())
      const loginResponse = await anonymousInstance.get(
        '/common/kakao-callback/',
        {
          headers: {
            Authorization: response.access_token,
          },
        },
      )
      const { result, message, success } = loginResponse.data
      if (success) {
        dispatch(loginSuccess(result))
      } else {
        dispatch(loginFail(message || '카카오 인증에 실패했습니다.'))
      }
    } catch (err: any) {
      const { result, message, success } = err.response.data
      if (message == KAKAO_USERINFO_ERROR) {
        dispatch(loginFail('이메일 제공 동의에 체크해 주세요.'))
        dispatch(kakaoAuthorize(KAKAO_EMAIL_SCOPE))
      } else {
        dispatch(loginFail('카카오 인증에 실패했습니다.'))
      }
    }
  }

export const kakaoAuthorize =
  (scope?: string) => (dispatch: Dispatch<object>) => {
    const config: any = {
      success: function (response: any) {
        dispatch(kakaoLoginCallback(response))
      },
      fail: function (error: any) {
        if (typeof error === 'string') {
          dispatch(loginFail(error))
        } else if ('error_description' in error) {
          dispatch(loginFail(error.error_description))
        } else {
          dispatch(loginFail('로그인에 실패했습니다.'))
        }
      },
    }
    if (scope) {
      config.scope = scope
    }
    window.Kakao.Auth.login(config)
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
