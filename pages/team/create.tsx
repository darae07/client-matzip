import { ReactElement } from 'react'
import HomeLayout from 'components/layout/HomeLayout'
import CreateTeamModal from 'components/modal/team/CreateTeamModal'

const CreateTeam = () => {
  return <CreateTeamModal />
}

export default CreateTeam

CreateTeam.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
