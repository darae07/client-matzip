import { LoginForm } from 'components/forms/auth/LoginForm'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { NextPageWithLayout } from 'type/ui'
import KakaoLogin from 'react-kakao-login'
import GoogleLogin from 'react-google-login'
import { kakaoLogin, googleLogin } from 'api/auth/socialLogin'
import { ReactElement, useEffect } from 'react'
import AuthLayout from 'components/layout/AuthLayout'
import { loginFail, logout } from 'api/auth/login'
import Link from 'next/link'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'

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
  const handleLoginFail = (err: any) => {
    if (typeof err === 'string') {
      dispatch(loginFail(err))
    } else if ('error_description' in err) {
      dispatch(loginFail(err.error_description))
    } else {
      dispatch(loginFail('로그인에 실패했습니다.'))
    }
  }
  const handleLogout = () => {
    dispatch(logout())
  }

  const { user } = useAppSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    console.log(user)
    if (user) {
      if (router.query.returnPath) {
        router.push(`${router.query.returnPath}`)
      } else {
        router.push('home')
      }
    }
  }, [user, router])

  return (
    <div>
      <p className="mb-4 text-slate-500 md:text-sm">
        로그인 정보를 입력해주세요.
      </p>

      <LoginForm />
      <div className="mt-2 flex justify-between text-gray-600 md:text-xs">
        <Link href="/signup">이메일로 회원가입</Link>
        <button>비밀번호 찾기</button>
      </div>
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
            onFailure={handleLoginFail}
            className="flex w-1/2"
          />
        )}

        {KAKAO_KEY && (
          <KakaoLogin
            token={KAKAO_KEY}
            onSuccess={handleKakaoLoginSuccess}
            onFail={handleLoginFail}
            onLogout={handleLogout}
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
    </div>
  )
}

export default Login

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}
