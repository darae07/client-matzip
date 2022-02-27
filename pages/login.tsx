import { LoginForm } from 'components/forms/auth/LoginForm'
import { useAppDispatch } from 'hooks'
import type { NextPage } from 'next'
import GoogleIcon from 'public/icon/google_corp_symbol.svg'
import KakaoLogin from 'react-kakao-login'
import { kakaoLogin } from 'api/auth/socialLogin'

const Login: NextPage = () => {
  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
  const dispatch = useAppDispatch()
  const handleKakaoLoginSuccess = (response: any) => {
    dispatch(kakaoLogin(response))
  }
  const handleKakaoLoginFail = () => {}
  const handleKakaoLogout = () => {}
  return (
    <div className="flex h-screen">
      <div className="flex w-full items-center p-10 md:w-1/2">
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
            <button className="flex w-1/2 items-center justify-center rounded-md border border-gray-300 py-2 px-2 font-semibold text-gray-500 md:text-sm">
              <GoogleIcon width="20" height="20" />
              <span className="ml-2"> Google 로그인</span>
            </button>
            {KAKAO_KEY && (
              <KakaoLogin
                token={KAKAO_KEY}
                onSuccess={handleKakaoLoginSuccess}
                onFail={handleKakaoLoginFail}
                onLogout={handleKakaoLogout}
                scopes={['id', 'kakao_account']}
                className="flex w-1/2 items-center justify-center rounded-md bg-yellow-400 py-2 px-2 font-semibold text-amber-900 md:text-sm"
              />
            )}
          </div>
          <div></div>
        </div>
      </div>
      <div className="hidden items-center p-28 md:flex md:w-1/2">
        이미지 영역
      </div>
    </div>
  )
}

export default Login
