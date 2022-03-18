import { anonymousInstance } from 'api/setupAxios'
import httpRequest from 'constants/httpRequest'
import { Dispatch } from 'react'
import { GoogleLoginResponse } from 'react-google-login'
import { catchError, userLoginStart } from 'store/modules/auth/user'
import { openToast } from 'store/modules/ui/toast'
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
        dispatch(loginFail(message || '로그인에 실패했습니다.'))
      }
    } catch {
      dispatch(loginFail('로그인에 실패했습니다.'))
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
        dispatch(loginFail(message || '로그인에 실패했습니다.'))
      }
    } catch {
      dispatch(loginFail('로그인에 실패했습니다.'))
    }
  }
