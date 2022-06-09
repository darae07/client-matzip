import { Dispatch } from '@reduxjs/toolkit'
import { anonymousInstance } from '@/api/setupAxios'
import { userLoginEnd, userLoginStart } from '@/store/modules/auth/user'
import { loginSuccess, loginFail } from './login'
import serverErrorMessage from '@/constants/serverResponseErrorMessages'
import _ from 'lodash'

export type SignUpValuesType = {
  email: string
  password1: string
  password2: string
}

export const signUP =
  (data: SignUpValuesType) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(userLoginStart())
      const response = await anonymousInstance.post(
        '/common/registration/',
        data,
      )
      const { result, message, success } = response.data

      if (success) {
        dispatch(loginSuccess(result))
      } else {
        dispatch(loginFail(message || '회원가입에 실패했습니다.'))
      }
    } catch (error: any) {
      const { data } = error.response
      const { message } = data

      if (message) {
        if (message.email) {
          if (
            message.email.includes(
              serverErrorMessage['ALREADY_REGISTERED_WITH_THIS_E-MAIL'],
            )
          ) {
            dispatch(loginFail('사용중인 이메일 입니다.'))
          }
        } else {
          const feedback = _.join(_.flattenDeep(Object.values(message)), ', ')
          dispatch(loginFail(feedback))
        }
      } else {
        dispatch(loginFail('회원가입에 실패했습니다.'))
      }
    } finally {
      dispatch(userLoginEnd())
    }
  }
