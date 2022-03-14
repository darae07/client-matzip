import { ReactElement } from 'react'
import HomeLayout from 'components/layout/HomeLayout'
import PartyDetailModal from 'components/modal/party/PartyDetailModal'
import { NextPageWithLayout } from 'type/ui'
import { useRouter } from 'next/router'

const PartyDetail: NextPageWithLayout = () => {
  const { query } = useRouter()
  const { id } = query

  return (
    <div>
      <PartyDetailModal {...{ id }} />
    </div>
  )
}

export default PartyDetail

PartyDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
