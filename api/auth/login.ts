import { anonymousInstance } from 'api/setupAxios'
import { resolve } from 'path'
import { Dispatch } from 'react'
import { setAccessToken, setRefreshToken } from 'store/modules/auth/token'
import { userLogin, catchError, userLoginStart } from 'store/modules/auth/user'
import { openToast } from 'store/modules/ui/toast'
import { ApiResponseType } from 'type/api'

export interface LoginValuesType {
  email: string
  password: string
}
export const login =
  (data: LoginValuesType) =>
  async (dispatch: Dispatch<Object>): Promise<ApiResponseType> => {
    try {
      dispatch(userLoginStart())
      const response = await anonymousInstance.post('/common/login/', data)
      const { result, message, success } = response.data
      const { user, access_token, refresh_token } = result
      dispatch(userLogin(user))
      dispatch(setAccessToken(access_token))
      dispatch(setRefreshToken(refresh_token))
      return { message, success }
    } catch (error) {
      dispatch(catchError('로그인에 실패했습니다.'))
      dispatch(openToast('로그인에 실패했습니다.'))
      return { message: '로그인 실패', success: false }
    }
  }
