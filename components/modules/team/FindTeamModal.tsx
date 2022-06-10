import _ from 'lodash'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Team,
  FindTeamValue,
  CreateMembershipValue,
  ApiResponseData,
  TeamMember,
} from '@/type'
import { teamCodeReg } from '@/constants/validation'
import { findTeamByCode, joinTeam } from '@/api/team'
import { useAppDispatch, useMutationHandleError } from '@/utils/hooks'
import { setUserTeamProfile } from '@/store/modules'
import { Form, FormInput, Modal, openToast } from '@/components'

const teamValues = {
  code: '',
}

const joinTeamValue = {
  member_name: '',
}

const FindTeamModal = () => {
  const router = useRouter()
  const { asPath } = router

  const showTeamFindModal = asPath === '/team/find'
  const closeModal = () => router.push('/team')

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
      onSuccess: (data: ApiResponseData<Team>) => {
        const { message, result } = data
        // dispatch(openToast(message || '회사를 찾았습니다.'))
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
    joinMutation.mutate({ ...values, team: data?.id })
  }
  const joinMutation = useMutationHandleError<TeamMember>(
    joinTeam,
    {
      onSuccess: (data: ApiResponseData<TeamMember>) => {
        const { message, result } = data
        openToast(message || '회사에 가입했습니다.')
        dispatch(setUserTeamProfile(result))
        closeModal()
      },
    },
    '회사에 가입할 수 없습니다.',
  )

  const data: Team | undefined = queryClient.getQueryData(['foundTeam'])

  const handleUpperCase = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.currentTarget.value.toUpperCase()

  return (
    <Modal
      handleClose={closeModal}
      isOpen={showTeamFindModal}
      title="회사 합류하기"
    >
      <>
        {!data && (
          <div className="mt-2 justify-between md:flex">
            <p className="mb-4 text-sm text-gray-700">
              동료에게 공유받은 입장코드를 입력해주세요
            </p>

            <Form<FindTeamValue>
              onSubmit={handleFindTeam}
              options={{
                defaultValues: teamValues,
                resolver: yupResolver(findTeamSchema),
                mode: 'onBlur',
              }}
            >
              <FormInput<FindTeamValue>
                name="code"
                placeholder="입장코드"
                onChange={handleUpperCase}
              />
              <div className="mb-2.5"></div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                회사 찾기
              </button>
            </Form>
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

              <Form<CreateMembershipValue>
                onSubmit={handleJoinTeam}
                options={{
                  defaultValues: joinTeamValue,
                  resolver: yupResolver(joinTeamSchema),
                  mode: 'onBlur',
                }}
              >
                <FormInput<CreateMembershipValue>
                  name="member_name"
                  placeholder="이름"
                  className="mb-2.5"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  합류하기
                </button>
              </Form>
            </div>
          </div>
        )}
      </>
    </Modal>
  )
}

export default FindTeamModal
