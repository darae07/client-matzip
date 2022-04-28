import { WhiteRoundedCard } from 'components/card/styledCard'
import HomeLayout from 'components/layout/HomeLayout'
import { ReactElement, useState } from 'react'
import { NextPageWithLayout } from 'type/ui'
import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import * as Yup from 'yup'
import { SearchKeywordMap, SearchCategory } from 'components/modules/party'
import { useAppDispatch } from '@/utils/hooks'
import { openToast } from 'store/modules/ui/toast'
import useMutationHandleError from '@/utils/hooks/useMutationHandleError'
import { createParty } from 'api/party/create'
import { ApiResponseData } from 'type/api'
import { Party } from 'type/party'
import { useQueryClient } from 'react-query'

const partyValue = {
  name: '',
  description: '',
}

type PartyCreateValue = {
  name: string
  description: string | null
}

const PartyCreate: NextPageWithLayout = () => {
  const createPartySchema = Yup.object().shape({
    name: Yup.string().required('제목을 입력해 주세요'),
    description: Yup.string().required('내용을 입력해 주세요'),
  })

  const [keyword, setKeyword] = useState(null)
  const [category, setCategory] = useState(null)

  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const handelCreateParty = (values: PartyCreateValue) => {
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
          <Formik
            enableReinitialize={true}
            initialValues={partyValue}
            validationSchema={createPartySchema}
            onSubmit={(values) => handelCreateParty(values)}
          >
            {({ handleSubmit, values }) => (
              <Form>
                <Field
                  name="name"
                  component={Input}
                  value={values.name}
                  placeholder="게시글 제목을 입력해 주세요"
                />
                <div className="mt-2.5"></div>
                <SearchKeywordMap setKeyword={setKeyword} keyword={keyword} />
                <div className="mt-4"></div>
                <SearchCategory setCategory={setCategory} category={category} />
                <Field
                  name="description"
                  type="textarea"
                  className="mt-2.5 h-20"
                  component={Input}
                  value={values.description}
                  placeholder="설명을 입력해 주세요"
                />
                <div className="mb-2.5"></div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  등록하기
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </WhiteRoundedCard>
    </div>
  )
}

export default PartyCreate
PartyCreate.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
