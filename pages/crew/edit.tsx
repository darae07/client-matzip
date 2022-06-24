import {
  Form,
  FormFileInput,
  FormInput,
  FormTextarea,
  HomeLayout,
  LoadingSpinner,
  openToast,
  WhiteRoundedCard,
} from '@/components'
import { useCrewItemQuery, useUpdateCrewMutation } from '@/queries'
import { CreateCrewValue, NextPageWithLayout } from '@/type'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import * as Yup from 'yup'

const CrewEdit: NextPageWithLayout = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { data, error, isLoading } = useCrewItemQuery(id)

  useEffect(() => {
    if (error) {
      openToast(error.response.data.message || '크루를 찾을 수 없습니다.')
      if (!isLoading) {
        router.back()
      }
    }
  }, [error, isLoading, router])

  const createCrewSchema = Yup.object({
    name: Yup.string().required('이름을 입력해 주세요'),
    title: Yup.string().required('설명을 입력해 주세요'),
  })

  const updateMutation = useUpdateCrewMutation()
  const handleUpdateCrew = (values: CreateCrewValue) => {
    const formData = new FormData()
    formData.append('name', values.name)
    if (values.title) {
      formData.append('title', values.title)
    }
    if (values.image !== data?.image && Array.isArray(values.image)) {
      formData.append('image', values.image[0])
    }
    updateMutation.mutate({ id, data: formData })
  }

  if (isLoading) {
    return (
      <div className="mt-10 mb-5 flex w-full justify-center">
        <LoadingSpinner width={30} height={30} />
      </div>
    )
  }

  if (data) {
    return (
      <div>
        <WhiteRoundedCard>
          <div className="text-xl font-bold">크루 수정하기</div>
          <p className="mb-4 mt-1 text-sm">크루 정보를 업데이트 해보세요.</p>
          <Form<CreateCrewValue>
            onSubmit={handleUpdateCrew}
            options={{
              resolver: yupResolver(createCrewSchema),
              defaultValues: data,
            }}
          >
            <FormFileInput<CreateCrewValue>
              name="image"
              accept={{
                'image/jpeg': ['.jpeg', '.png', '.jpg'],
              }}
              mode="update"
            />
            <FormInput<CreateCrewValue>
              name="name"
              placeholder="이름을 입력해 주세요"
              className="my-4"
              hasWhiteSpace
            />
            <FormTextarea<CreateCrewValue>
              name="title"
              className="mb-4 h-20"
              placeholder="크루 설명을 입력해 주세요."
            />
            <input
              type="submit"
              disabled={isLoading || updateMutation.isLoading}
              className={classNames(
                'inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:cursor-pointer hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                {
                  'bg-gray-400 text-white':
                    isLoading || updateMutation.isLoading,
                },
              )}
              value="저장하기"
            />
          </Form>
        </WhiteRoundedCard>
      </div>
    )
  }
  return <></>
}

export default CrewEdit

CrewEdit.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
