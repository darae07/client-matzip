import { createCrew } from '@/api'
import {
  HomeLayout,
  WhiteRoundedCard,
  Form,
  FormInput,
  FormTextarea,
  openToast,
} from '@/components'
import {
  ApiResponseData,
  CreateCrewValue,
  Crew,
  NextPageWithLayout,
} from '@/type'
import { useMutationHandleError } from '@/utils/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import * as Yup from 'yup'

const CreateCrew: NextPageWithLayout = () => {
  const createCrewSchema = Yup.object({
    name: Yup.string().required('이름을 입력해 주세요'),
    title: Yup.string().required('설명을 입력해 주세요'),
  })
  const router = useRouter()

  const handleCreateCrew = (values: CreateCrewValue) => mutate(values)

  const { mutate, isLoading } = useMutationHandleError(
    createCrew,
    {
      onSuccess: (data: ApiResponseData<Crew>) => {
        const { message, result } = data
        openToast(message || '크루를 등록했습니다.')
        router.push('/crew')
      },
    },
    '크루를 등록할 수 없습니다.',
  )

  return (
    <div>
      <WhiteRoundedCard>
        <div className="text-xl font-bold">크루 등록하기</div>
        <p className="mb-4 mt-1 text-sm">
          크루를 등록하고 동료들을 초대해보세요. 점심 메뉴를 투표로 결정할 수
          있습니다.
        </p>
        <Form<CreateCrewValue>
          onSubmit={handleCreateCrew}
          options={{
            resolver: yupResolver(createCrewSchema),
          }}
        >
          <FormInput<CreateCrewValue>
            name="name"
            placeholder="이름을 입력해 주세요"
            className="mb-4"
            hasWhiteSpace
          />
          <FormTextarea<CreateCrewValue>
            name="title"
            className="mb-4"
            placeholder="크루 설명을 입력해 주세요."
          />
          <input
            type="submit"
            disabled={isLoading}
            className={classNames(
              'inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:cursor-pointer hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              {
                'bg-gray-400 text-white': isLoading,
              },
            )}
            value="등록하기"
          />
        </Form>
      </WhiteRoundedCard>
    </div>
  )
}

export default CreateCrew

CreateCrew.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
