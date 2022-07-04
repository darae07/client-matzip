import { ReactElement, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  HomeLayout,
  WhiteRoundedCard,
  Form,
  FormInput,
  openToast,
  Stepper,
} from '@/components'
import {
  ApiResponseData,
  Lunch,
  NextPageWithLayout,
  SearchKeywordValue,
} from '@/type'
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

  const [keyword, setKeyword] = useState<SearchKeywordValue>()
  const [category, setCategory] = useState()

  const handleCreateLunch = (values: LunchCreateValue) => {
    if (!keyword?.keyword) {
      openToast('지도에서 맛집을 선택해 주세요')
      const keywordInput = document.getElementById('keyword')
      keywordInput?.classList.add('input-error')
      return
    }
    if (!category) {
      openToast('카테고리를 선택해 주세요')
      return
    }
    mutate({ ...values, ...keyword, category, crew: id })
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

  const [step, setStep] = useState(0)

  return (
    <div>
      <WhiteRoundedCard>
        <div className="text-xl font-bold">오늘의 메뉴 등록하기</div>
        <Stepper step={step}>
          <Stepper.Step>
            <div>
              <p className="mb-4 mt-1 text-sm">
                동료들과 오늘 먹고 싶은 점심 메뉴를 등록해 보세요. 맛집 이름으로
                검색해 보세요.
              </p>
              <SearchKeywordMap setKeyword={setKeyword} setStep={setStep} />
            </div>
          </Stepper.Step>
          <Stepper.Step>
            <div>
              <p className="mb-4 mt-1 text-sm">
                동료들을 만날 수 있도록 정보를 알려주세요.
              </p>
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
                  className="mb-4"
                />

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
          </Stepper.Step>
          <Stepper.Button
            atctionType="prev"
            text="다시 선택하기"
            color="blue"
            className="mt-4"
          />
          {!!keyword?.isSetted && (
            <Stepper.Button
              atctionType="next"
              text="다음"
              color="blue"
              className="ml-2 mt-4"
            />
          )}
        </Stepper>
      </WhiteRoundedCard>
    </div>
  )
}

export default LunchCreate
LunchCreate.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
