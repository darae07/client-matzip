import { ReactElement } from 'react'
import { HomeLayout } from '@/components'
import { FindTeamModal } from '@/components/modules'

const FindTeam = () => {
  return <FindTeamModal />
}

export default FindTeam

FindTeam.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
