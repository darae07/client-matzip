import { anonymousInstance } from 'api/setupAxios'
import { useAppDispatch } from 'hooks'
import { setAccessToken, setRefreshToken } from 'store/modules/auth/token'
import { userLogin, catchError } from 'store/modules/auth/user'
import { AppDispatch } from 'store'

interface LoginForm {
  email: string
  password: string
}
const login = (data: LoginForm) => async (dispatch: AppDispatch) => {
  try {
    const response = await anonymousInstance.post('/common/login/', data)
    const { result, message } = response.data
    const { user, access_token, refresh_token } = result
    dispatch(userLogin(user))
    dispatch(setAccessToken(access_token))
    dispatch(setRefreshToken(refresh_token))
    return message
  } catch (error) {
    console.log(error)
    dispatch(catchError('로그인에 실패했습니다.'))
  }
}

export { login }
