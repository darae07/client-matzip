import { HomeLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/type'
import { ReactElement } from 'react'

const LunchCreate: NextPageWithLayout = () => {
  return <div></div>
}

export default LunchCreate
LunchCreate.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
