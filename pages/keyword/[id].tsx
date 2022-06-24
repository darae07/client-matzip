import { HomeLayout } from '@/components'
import { NextPageWithLayout } from '@/type'
import { ReactElement } from 'react'

const KeywordDetail: NextPageWithLayout = () => {
  return <div></div>
}

export default KeywordDetail
KeywordDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
