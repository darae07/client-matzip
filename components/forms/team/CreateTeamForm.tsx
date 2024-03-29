import _ from 'lodash'
import { FC } from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormInput } from '@/components'
import { locationDongReg } from '@/constants/validation'
import { CreateTeam, CreateTeamValue, ApiResponseData } from '@/type'
import { createTeam } from '@/api/team'
import { openToast, setUserTeamProfile } from '@/store/modules'
import { useAppDispatch, useMutationHandleError } from '@/utils/hooks'

const teamValues: CreateTeamValue = {
  name: '',
  location: '',
}

export const CreateTeamForm: FC = () => {
  const teamFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, '너무 짧습니다')
      .max(50, '50자 이내로 입력해 주세요')
      .required('회사명을 입력해 주세요'),
    location: Yup.string()
      .min(3, '너무 짧습니다')
      .max(50, '10자 이내로 입력해 주세요')
      .required('위치를 동단위로 입력해 주세요')
      .matches(locationDongReg, '위치를 동단위로 입력해 주세요'),
  })

  const handleCreateTeam = (values: CreateTeamValue) => {
    mutate(values)
  }

  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutationHandleError(
    createTeam,
    {
      onSuccess: (data: ApiResponseData<CreateTeam>) => {
        const { message, result } = data
        dispatch(openToast(message || '회사를 생성했습니다.'))
        queryClient.setQueryData(['myTeam'], result)
        dispatch(setUserTeamProfile(result.team_profile))
      },
    },
    '회사를 생성할 수 없습니다.',
  )

  return (
    <div>
      <Form<CreateTeamValue>
        onSubmit={handleCreateTeam}
        options={{
          resolver: yupResolver(teamFormSchema),
          defaultValues: teamValues,
          mode: 'onBlur',
        }}
      >
        <FormInput<CreateTeamValue> name="name" placeholder="회사명" />
        <div className="mb-2.5"></div>
        <FormInput<CreateTeamValue> name="location" placeholder="위치" />
        <div className="mb-2.5"></div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-500 disabled:text-white"
        >
          생성하기
        </button>
      </Form>
    </div>
  )
}
