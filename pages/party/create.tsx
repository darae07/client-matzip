import { ReactElement, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { NextPageWithLayout, ApiResponseData, Party } from '@/type'
import { useAppDispatch, useMutationHandleError } from '@/utils/hooks'
import { Form, FormInput, WhiteRoundedCard, HomeLayout } from '@/components'
import { SearchKeywordMap, SearchCategory } from '@/components/modules'
import { openToast } from '@/store/modules'
import { createParty } from '@/api'

type PartyCreateValue = {
  name: string
  description: string | null
}

const PartyCreate: NextPageWithLayout = () => {
  const createPartySchema = Yup.object().shape({
    name: Yup.string().required('제목을 입력해 주세요'),
  })

  const [keyword, setKeyword] = useState(null)
  const [category, setCategory] = useState(null)

  const dispatch = useAppDispatch()

  const handelCreateParty = (values: PartyCreateValue) => {
    console.log('submit')
    if (!keyword) {
      dispatch(openToast('맛집 이름을 입력해 주세요'))
      return
    }
    if (!category) {
      dispatch(openToast('카테고리를 선택해 주세요'))
      return
    }
    mutate({ ...values, keyword, category })
  }

  const { mutate, isLoading } = useMutationHandleError(
    createParty,
    {
      onSuccess: (data: ApiResponseData<Party>) => {
        const { message, result } = data
        dispatch(openToast(message || '오늘의 메뉴를 등록했습니다.'))
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
          <Form<PartyCreateValue>
            onSubmit={handelCreateParty}
            options={{
              resolver: yupResolver(createPartySchema),
              mode: 'onBlur',
            }}
          >
            <FormInput<PartyCreateValue>
              name="name"
              placeholder="게시글 제목을 입력해 주세요"
            />
            <div className="mt-2.5"></div>
            <SearchKeywordMap setKeyword={setKeyword} keyword={keyword} />
            <div className="mt-4"></div>
            <SearchCategory setCategory={setCategory} category={category} />
            <FormInput<PartyCreateValue>
              name="description"
              className="my-2.5 h-20"
              placeholder="설명을 입력해 주세요"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              등록하기
            </button>
          </Form>
        </div>
      </WhiteRoundedCard>
    </div>
  )
}

export default PartyCreate
PartyCreate.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
