import { anonymousInstance } from 'api/setupAxios'
import httpRequest from 'constants/httpRequest'
import { Dispatch } from 'react'
import { setAccessToken, setRefreshToken } from 'store/modules/auth/token'
import { catchError, userLogin, userLoginStart } from 'store/modules/auth/user'
import { openToast } from 'store/modules/ui/toast'
import { User } from 'type/user'
import { loginSuccess, loginFail } from './login'

export const kakaoLogin =
  (response: any) => async (dispatch: Dispatch<object>) => {
    try {
      dispatch(userLoginStart())
      console.log(response)
      const loginResponse = await anonymousInstance.get(
        '/common/kakao-callback/',
        {
          params: {
            access_token: response.response.access_token,
            refresh_token: response.response.refresh_token,
            nickname: response.profile.kakao_account.profile.nickname,
            email: response.profile.kakao_account.email,
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

export const googleLogin = () => async (dispatch: Dispatch<object>) => {
  try {
    dispatch(userLoginStart())
    window.location.replace(
      `${httpRequest.SERVICE_BASE_URL}api/common/google_login/`,
    )
    // const response = await anonymousInstance.get('/common/google_login/')
    // const { result, message, success } = response.data
    // dispatch(afterLogin(result))
  } catch {
    dispatch(catchError('로그인에 실패했습니다.'))
    dispatch(openToast('로그인에 실패했습니다.'))
  }
}
