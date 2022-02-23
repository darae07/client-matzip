import React, { FC } from 'react'
import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import * as Yup from 'yup'

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
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        '비밀번호는 대문자, 소문자, 숫자 조합으로 입력해주세요',
      )
      .required('비밀번호를 입력해주세요'),
  })
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={loginValues}
        validationSchema={loginFormSchema}
        onSubmit={() => {}}
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
