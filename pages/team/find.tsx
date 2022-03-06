import { ReactElement } from 'react'
import HomeLayout from 'components/layout/HomeLayout'
import FindTeamModal from 'components/modal/team/FindTeamModal'

const FindTeam = () => {
  return <FindTeamModal />
}

export default FindTeam

FindTeam.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
