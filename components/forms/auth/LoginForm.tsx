import React, { FC } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { login, LoginValuesType } from '@/api/auth/login'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { LoadingSpinner, Form, FormInput } from '@/components'

const loginValues = {
  email: '',
  password: '',
}

export const LoginForm: FC = () => {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string()
      .email('이메일 형식에 맞게 입력해주세요')
      .min(3, '너무 짧습니다')
      .max(50, '50자 이내로 입력해 주세요')
      .required('이메일을 입력해주세요'),
    password: Yup.string()
      .min(3, '5글자 이상 입력해 주세요')
      .required('비밀번호를 입력해주세요'),
  })

  const dispatch = useAppDispatch()
  const handleLogin = async (values: LoginValuesType) => {
    const data = await dispatch(login(values))
  }
  const { isLoading } = useAppSelector((state) => ({
    isLoading: state.user.isLoading,
  }))

  return (
    <div>
      <Form<LoginValuesType>
        onSubmit={handleLogin}
        options={{
          defaultValues: loginValues,
          resolver: yupResolver(loginFormSchema),
          mode: 'onBlur',
        }}
      >
        <FormInput<LoginValuesType>
          name="email"
          placeholder="이메일 주소"
          className="mb-2.5"
        />
        <FormInput<LoginValuesType>
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        <button
          type="submit"
          className="mt-2.5 w-full items-center justify-center rounded-md border  bg-sky-600 py-2 px-2 font-semibold text-white hover:bg-sky-700 md:text-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner
              width="24"
              height="16"
              className="mr-3 inline h-4 w-4 text-white"
            />
          ) : (
            '로그인'
          )}
        </button>
      </Form>
    </div>
  )
}
