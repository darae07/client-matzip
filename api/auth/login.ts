import { anonymousInstance } from '@/api/setupAxios'
import { Dispatch } from '@reduxjs/toolkit'
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
  userLogin,
  catchError,
  userLoginStart,
  userLogout,
} from '@/store/modules'
import { openToast } from '@/components'
import { User } from '@/type'

export type LoginValuesType = {
  email: string
  password: string
}

interface LoginParams {
  user: User
  access_token: string
  refresh_token: string
}

export const login =
  (data: LoginValuesType) => async (dispatch: Dispatch<any>) => {
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
  async (dispatch: Dispatch) => {
    dispatch(userLogin(user))
    dispatch(setAccessToken(access_token))
    dispatch(setRefreshToken(refresh_token))
  }

export const loginFail = (message: string) => async (dispatch: Dispatch) => {
  dispatch(catchError(message))
  openToast(message)
}

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(userLogout())
  dispatch(removeAccessToken())
  dispatch(removeRefreshToken())
}
