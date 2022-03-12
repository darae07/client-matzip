import { SignUpForm } from 'components/forms/auth/SignUpForm'
import AuthLayout from 'components/layout/AuthLayout'
import { useAppSelector } from 'hooks'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { NextPageWithLayout } from 'type/ui'

const SignUp: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (user.user) {
      router.push('/home')
    }
  }, [user])

  return (
    <div>
      <p className="mb-4 text-slate-500 md:text-sm">
        이메일 주소로 계정을 만드세요.
      </p>

      <SignUpForm />
    </div>
  )
}

export default SignUp

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}
