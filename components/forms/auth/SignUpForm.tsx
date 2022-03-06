import React, { FC } from 'react'
import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from 'hooks'
import LoadingSpinner from 'components/skeletons/LoadingSpinner'
import { signUP, SignUpValuesType } from 'api/auth/signUp'
import { passwordReg } from 'constants/validation'

const signUpValues = {
  email: '',
  password1: '',
  password2: '',
}

export const SignUpForm: FC = () => {
  const signUpFormSchema = Yup.object().shape({
    email: Yup.string()
      .email('이메일 형식에 맞게 입력해주세요')
      .min(3, '너무 짧습니다')
      .max(50, '50자 이내로 입력해 주세요')
      .required('이메일을 입력해주세요'),
    password1: Yup.string()
      .min(8, '8글자 이상 입력해 주세요')
      .required('비밀번호를 입력해주세요')
      .matches(
        passwordReg,
        '비밀번호는 대문자, 소문자, 숫자 조합으로 입력해주세요',
      ),
    password2: Yup.string()
      .required('비밀번호를 확인해주세요')
      .oneOf([Yup.ref('password1'), null], '비밀번호가 다릅니다.'),
  })

  const dispatch = useAppDispatch()
  const handleSignUp = async (values: SignUpValuesType) => {
    dispatch(signUP(values))
  }
  const { isLoading } = useAppSelector((state) => ({
    isLoading: state.user.isLoading,
  }))

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={signUpValues}
        validationSchema={signUpFormSchema}
        onSubmit={(values) => {
          handleSignUp(values)
        }}
      >
        {({ handleSubmit, values }) => (
          <Form>
            <Field
              name="email"
              component={Input}
              value={values.email}
              placeholder="이메일 주소"
            />
            <div className="mb-2.5"></div>
            <Field
              name="password1"
              type="password"
              component={Input}
              value={values.password1}
              placeholder="비밀번호"
            />
            <div className="mb-2.5"></div>
            <Field
              name="password2"
              type="password"
              component={Input}
              value={values.password2}
              placeholder="비밀번호 확인"
            />
            <button
              type="submit"
              onSubmit={() => handleSubmit()}
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
                '회원가입'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
