import { WhiteRoundedCard } from 'components/card/styledCard'
import HomeLayout from 'components/layout/HomeLayout'
import { ReactElement, useState } from 'react'
import { NextPageWithLayout } from 'type/ui'
import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import * as Yup from 'yup'
import { SearchKeywordMap, SearchCategory } from 'components/modules/party'

const partyValue = {
  name: '',
  description: '',
}

const PartyCreate: NextPageWithLayout = () => {
  const createPartySchema = Yup.object().shape({
    name: Yup.string().required('제목을 입력해 주세요'),
  })

  const [keyword, setKeyword] = useState(null)
  const [category, setCategory] = useState(null)

  const handelCreateParty = (values) => {}

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
                  placeholder="제목을 입력해 주세요"
                />
                <div className="mt-2.5"></div>
                <SearchKeywordMap setKeyword={setKeyword} />
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
                  onSubmit={() => handleSubmit()}
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
