import { Input } from 'components'
import { LoginForm } from 'components/forms/auth/LoginForm'
import type { NextPage } from 'next'
import Image from 'next/image'

const Login: NextPage = () => {
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
              <Image
                src="/icon/google_corp_symbol.svg"
                width="24"
                height="16"
              />
              구글로 로그인
            </button>
            <button className="flex w-1/2 items-center justify-center rounded-md bg-yellow-400 py-2 px-2 font-semibold text-amber-900 md:text-sm">
              <Image
                src="/icon/Kakao_Corp_symbol.svg"
                width="24"
                height="16"
                className="mr-2"
              />
              카카오로 로그인
            </button>
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
