import { anonymousInstance } from 'api/setupAxios'
import { resolve } from 'path'
import { Dispatch } from 'react'
import { setAccessToken, setRefreshToken } from 'store/modules/auth/token'
import { userLogin, catchError, userLoginStart } from 'store/modules/auth/user'
import { openToast } from 'store/modules/ui/toast'
import { ApiResponseType } from 'type/api'
import { User } from 'type/user'

export interface LoginValuesType {
  email: string
  password: string
}

interface LoginParams {
  user: User
  access_token: string
  refresh_token: string
}

export const login =
  (data: LoginValuesType) => async (dispatch: Dispatch<Object>) => {
    try {
      dispatch(userLoginStart())
      const response = await anonymousInstance.post('/common/login/', data)
      const { result, message, success } = response.data

      if (success) {
        dispatch(loginSuccess(result))
      } else {
        dispatch(loginFail(message || '로그인에 실패했습니다.'))
      }
    } catch (error) {
      dispatch(loginFail('로그인에 실패했습니다.'))
    }
  }

export const loginSuccess =
  ({ user, access_token, refresh_token }: LoginParams) =>
  async (dispatch: Dispatch<object>) => {
    dispatch(userLogin(user))
    dispatch(setAccessToken(access_token))
    dispatch(setRefreshToken(refresh_token))
  }

export const loginFail =
  (message: string) => async (dispatch: Dispatch<object>) => {
    dispatch(catchError(message))
    dispatch(openToast(message))
  }
