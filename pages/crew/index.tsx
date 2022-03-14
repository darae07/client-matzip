import HomeLayout from 'components/layout/HomeLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from 'type/ui'

const CrewPage: NextPageWithLayout = () => {
  return <div></div>
}

export default CrewPage

CrewPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
