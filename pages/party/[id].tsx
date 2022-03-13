import { ReactElement } from 'react'
import HomeLayout from 'components/layout/HomeLayout'
import PartyDetailModal from 'components/modal/party/PartyDetailModal'
import { NextPageWithLayout } from 'type/ui'

const PartyDetail: NextPageWithLayout = () => {
  return <PartyDetailModal />
}

export default PartyDetail
PartyDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
