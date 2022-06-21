import { HomeLayout } from '@/components'
import { NextPageWithLayout } from '@/type'
import { ReactElement } from 'react'

const CrewDetail: NextPageWithLayout = () => {
  return <div></div>
}

export default CrewDetail

CrewDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
