import { anonymousInstance } from 'api/setupAxios'
import httpRequest from 'constants/httpRequest'
import { Dispatch } from 'react'
import { catchError, userLoginStart } from 'store/modules/auth/user'
import { openToast } from 'store/modules/ui/toast'
import { loginSuccess, loginFail } from './login'
import { SocialAccountParams } from 'type/user'

export const kakaoLogin =
  (response: any) => async (dispatch: Dispatch<object>) => {
    try {
      dispatch(userLoginStart())
      const params: SocialAccountParams = {
        access_token: response.response.access_token,
        refresh_token: response.response.refresh_token,
        nickname: response.profile.kakao_account.profile.nickname,
        email: response.profile.kakao_account.email,
      }
      const loginResponse = await anonymousInstance.get(
        '/common/kakao-callback/',
        {
          params: params,
        },
      )
      const { result, message, success } = loginResponse.data
      if (success) {
        dispatch(loginSuccess(result))
      } else {
        dispatch(loginFail(message || '로그인에 실패했습니다.'))
      }
    } catch {
      dispatch(loginFail('로그인에 실패했습니다.'))
    }
  }

export const googleLogin =
  (response: any) => async (dispatch: Dispatch<object>) => {
    try {
      dispatch(userLoginStart())
      const params: SocialAccountParams = {
        access_token: response.accessToken,
        nickname: response.profileObj.name,
        email: response.profileObj.email,
      }
      const loginResponse = await anonymousInstance.get(
        '/common/google-callback/',
        {
          params: params,
        },
      )
      const { result, message, success } = loginResponse.data
      if (success) {
        dispatch(loginSuccess(result))
      } else {
        dispatch(loginFail(message || '로그인에 실패했습니다.'))
      }
    } catch {
      dispatch(loginFail('로그인에 실패했습니다.'))
    }
  }
