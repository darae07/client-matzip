import { HomeLayout } from '@/components'
import { NextPageWithLayout } from '@/type'
import { ReactElement } from 'react'

const CreateCrew: NextPageWithLayout = () => {
  return <div></div>
}

export default CreateCrew

CreateCrew.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
