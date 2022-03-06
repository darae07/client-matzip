import { FC } from 'react'
import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import * as Yup from 'yup'
import { FindTeamValue } from 'type/team'
import { useMutation, useQueryClient } from 'react-query'
import { findTeamByCode } from 'api/team'
import { ApiResponseData, ApiErrorResponse } from 'type/api'
import { openToast } from 'store/modules/ui/toast'
import { useAppDispatch } from 'hooks'
import _ from 'lodash'
import { teamCodeReg } from 'constants/validation'

const teamValues = {
  code: '',
}

export const FindTeamForm: FC = () => {
  const findTeamSchema = Yup.object().shape({
    code: Yup.string()
      .min(6, '입장코드는 6글자 입니다.')
      .max(6, '입장코드는 6글자 입니다.')
      .required('입장코드를 입력해 주세요')
      .matches(teamCodeReg, '영문과 숫자만 입력 가능합니다.'),
  })

  const handleFindTeam = (values: FindTeamValue) => {
    mutate(values)
  }

  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(findTeamByCode, {
    onSuccess: (data: ApiResponseData) => {
      const { message, result } = data
      dispatch(openToast(message || '회사를 찾았습니다.'))
      queryClient.setQueryData(['foundTeam'], result)
    },
    onError: (error: ApiErrorResponse) => {
      const { message } = error.response.data
      dispatch(
        openToast(_.isString(message) ? message : '회사를 찾을 수 없습니다.'),
      )
    },
  })

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={teamValues}
        validationSchema={findTeamSchema}
        onSubmit={(values) => handleFindTeam(values)}
      >
        {({ handleSubmit, values }) => (
          <Form>
            <Field
              name="code"
              component={Input}
              value={values.code}
              placeholder="입장코드"
            />
            <div className="mb-2.5"></div>
            <button
              type="submit"
              disabled={isLoading}
              onSubmit={() => handleSubmit()}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              회사 찾기
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
