import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Fragment, useState } from 'react'
import HomeLayout from 'components/layout/HomeLayout'
import CreateTeamModal from 'components/modal/team/CreateTeamModal'

const CreateTeam = () => {
  const router = useRouter()
  return <CreateTeamModal />
}

export default CreateTeam

CreateTeam.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
