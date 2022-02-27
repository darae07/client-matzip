import { LoginForm } from 'components/forms/auth/LoginForm'
import { useAppDispatch } from 'hooks'
import { NextPageWithLayout } from 'type/ui'
import KakaoLogin from 'react-kakao-login'
import GoogleLogin from 'react-google-login'
import { kakaoLogin, googleLogin } from 'api/auth/socialLogin'
import { ReactElement } from 'react'
import AuthLayout from 'components/layout/AuthLayout'

const Login: NextPageWithLayout = () => {
  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
  const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  const dispatch = useAppDispatch()
  const handleKakaoLoginSuccess = (response: any) => {
    dispatch(kakaoLogin(response))
  }
  const handleGoogleLoginSuccess = (response: any) => {
    dispatch(googleLogin(response))
  }
  const handleKakaoLoginFail = () => {}
  const handleKakaoLogout = () => {}

  return (
    <div>
      <div className="mx-auto">
        <h1 className="text-3xl font-bold">쉽고 빠른 점심메뉴 의사결정</h1>
        <p className="my-4 text-slate-500 md:text-sm">
          로그인 정보를 입력해주세요.
        </p>

        <LoginForm />
        <div className="my-5 w-full border-t border-gray-300">
          <p className="my-4 text-slate-500 md:text-sm">
            소셜 계정으로 3초만에 로그인/회원가입 하기
          </p>
        </div>
        <div className="flex space-x-2">
          {GOOGLE_KEY && (
            <GoogleLogin
              clientId={GOOGLE_KEY}
              buttonText="로그인"
              onSuccess={handleGoogleLoginSuccess}
              className="flex w-1/2"
            />
          )}

          {KAKAO_KEY && (
            <KakaoLogin
              token={KAKAO_KEY}
              onSuccess={handleKakaoLoginSuccess}
              onFail={handleKakaoLoginFail}
              onLogout={handleKakaoLogout}
              scopes={['id', 'kakao_account']}
              render={({ onClick }) => (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onClick()
                  }}
                  className="flex w-1/2 items-center justify-center rounded-md bg-[url(//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg)] py-2 px-2 font-semibold text-amber-900 md:text-sm"
                />
              )}
            />
          )}
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Login

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}
