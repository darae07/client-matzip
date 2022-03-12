import { FindTeamForm } from 'components/forms/team/FindTeamForm'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Team } from 'type/team'
import PageModal from '../PageModal'
import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import * as Yup from 'yup'
import { FindTeamValue, CreateMembershipValue } from 'type/team'
import { useMutation, useQueryClient } from 'react-query'
import { findTeamByCode, joinTeam } from 'api/team'
import { ApiResponseData, ApiErrorResponse } from 'type/api'
import { openToast } from 'store/modules/ui/toast'
import { useAppDispatch } from 'hooks'
import _ from 'lodash'
import { teamCodeReg } from 'constants/validation'
import { setUserTeamProfile } from 'store/modules/auth/user'
import useMutationHandleError from 'hooks/useMutationHandleError'

const teamValues = {
  code: '',
}

const joinTeamValue = {
  member_name: '',
}

const FindTeamModal = () => {
  const router = useRouter()
  const closeModal = () => {
    router.push('/team')
  }

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

  const { mutate, isLoading } = useMutationHandleError(
    findTeamByCode,
    {
      onSuccess: (data: ApiResponseData) => {
        const { message, result } = data
        dispatch(openToast(message || '회사를 찾았습니다.'))
        queryClient.setQueryData(['foundTeam'], result)
      },
    },
    '회사를 찾을 수 없습니다.',
  )

  const joinTeamSchema = Yup.object().shape({
    member_name: Yup.string()
      .required('이름은 필수항목입니다.')
      .min(3, '3글자 이상 입력해 주세요')
      .max(6, '10글자 미만으로 입력해 주세요'),
  })

  const handleJoinTeam = (values: CreateMembershipValue) => {
    joinMutation.mutate(values)
  }
  const joinMutation = useMutationHandleError(
    joinTeam,
    {
      onSuccess: (data: ApiResponseData) => {
        const { message, result } = data
        dispatch(openToast(message || '회사에 가입했습니다.'))
        dispatch(setUserTeamProfile(result))
      },
    },
    '회사에 가입할 수 없습니다.',
  )

  const data: Team | undefined = queryClient.getQueryData(['foundTeam'])
  return (
    <PageModal closeAction={closeModal} title="회사 합류하기">
      {!data && (
        <div className="mt-2 justify-between md:flex">
          <p className="mb-4 text-sm text-gray-700">
            동료에게 공유받은 입장코드를 입력해주세요
          </p>
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
      )}
      {!!data && (
        <div className="mt-2 justify-between md:flex">
          <p className="mb-4 text-sm text-gray-700">
            이 회사에 합류할까요?
            <br /> 동료들이 알아볼 수 있도록 이름을 알려주세요.
          </p>
          <div className="w-1/2">
            <p className="font-bold">{data.name}</p>
            <p>{data.location}</p>
            <p>{data.title}</p>
            <Formik
              enableReinitialize={true}
              initialValues={joinTeamValue}
              validationSchema={joinTeamSchema}
              onSubmit={(values) =>
                handleJoinTeam({ ...values, team: data.id })
              }
            >
              {({ handleSubmit, values }) => (
                <Form>
                  <Field
                    name="member_name"
                    component={Input}
                    value={values.member_name}
                    placeholder="이름"
                  />
                  <div className="mb-2.5"></div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    onSubmit={() => handleSubmit()}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    합류하기
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </PageModal>
  )
}

export default FindTeamModal
