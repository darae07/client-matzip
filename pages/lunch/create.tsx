import { ReactElement, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  HomeLayout,
  WhiteRoundedCard,
  Form,
  FormInput,
  openToast,
} from '@/components'
import { ApiResponseData, Lunch, NextPageWithLayout } from '@/type'
import { useMutationHandleError } from '@/utils/hooks'
import { createLunch } from '@/api'
import { useRouter } from 'next/router'
import { SearchCategory, SearchKeywordMap } from '@/components/modules'
import classNames from 'classnames'

type LunchCreateValue = {
  title: string
}
const LunchCreate: NextPageWithLayout = () => {
  const createLunchSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력해 주세요.'),
  })
  const router = useRouter()
  const {
    query: { id },
  } = router

  const [keyword, setKeyword] = useState(null)
  const [category, setCategory] = useState()

  const handleCreateLunch = (values: LunchCreateValue) => {
    if (!keyword) {
      openToast('지도에서 맛집을 선택해 주세요')
      const keywordInput = document.getElementById('keyword')
      keywordInput?.classList.add('input-error')
      return
    }
    if (!category) {
      openToast('카테고리를 선택해 주세요')
      return
    }
    mutate({ ...values, keyword, category, crew: id })
  }

  const { mutate, isLoading } = useMutationHandleError(
    createLunch,
    {
      onSuccess: (data: ApiResponseData<Lunch>) => {
        const { message, result } = data
        openToast(message || '오늘의 메뉴를 등록했습니다.')
        router.push(`/crew/${result.crew}`)
      },
    },
    '오늘의 메뉴를 등록할 수 없습니다.',
  )

  return (
    <div>
      <WhiteRoundedCard>
        <div className="text-xl font-bold">오늘의 메뉴 등록하기</div>
        <p className="mb-4 mt-1 text-sm">
          동료들과 오늘 먹고 싶은 점심 메뉴를 등록해 보세요.
        </p>
        <div>
          <Form<LunchCreateValue>
            onSubmit={handleCreateLunch}
            options={{
              resolver: yupResolver(createLunchSchema),
              mode: 'onBlur',
            }}
          >
            <FormInput<LunchCreateValue>
              name="title"
              placeholder="게시글 제목을 입력해 주세요"
              hasWhiteSpace
            />
            <div className="mt-2.5"></div>
            <SearchKeywordMap setKeyword={setKeyword} keyword={keyword} />
            <div className="mt-4"></div>
            <SearchCategory setCategory={setCategory} category={category} />

            <input
              type="submit"
              disabled={isLoading}
              className={classNames(
                'mt-4 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:cursor-pointer hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                {
                  'bg-gray-400 text-white': isLoading,
                },
              )}
              value="등록하기"
            />
          </Form>
        </div>
      </WhiteRoundedCard>
    </div>
  )
}

export default LunchCreate
LunchCreate.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
