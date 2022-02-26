import React, { FC } from 'react'
import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import * as Yup from 'yup'
import { login, LoginValuesType } from 'api/auth/login'
import { ApiResponseType } from 'type/api'
import { useAppDispatch, useAppSelector } from 'hooks'
import LoadingSpinner from 'components/skeletons/LoadingSpinner'

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
      .min(8, '8글자 이상 입력해 주세요')
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
      <Formik
        enableReinitialize={true}
        initialValues={loginValues}
        validationSchema={loginFormSchema}
        onSubmit={(values) => {
          handleLogin(values)
        }}
      >
        {({ handleSubmit, values }) => (
          <Form>
            <Field name="email" component={Input} value={values.email} />
            <div className="mb-2.5"></div>
            <Field
              name="password"
              type="password"
              component={Input}
              value={values.password}
            />
            <button
              type="submit"
              onSubmit={() => handleSubmit()}
              className="mt-2.5 w-full items-center justify-center rounded-md border  bg-sky-600 py-2 px-2 font-semibold text-white md:text-sm"
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
        )}
      </Formik>
      <div className="mt-2 flex justify-between text-gray-600 md:text-xs">
        <button>회원가입</button>
        <button>비밀번호 찾기</button>
      </div>
    </div>
  )
}
