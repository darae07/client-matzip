import HomeLayout from 'components/layout/HomeLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from 'type/ui'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { useAppSelector } from 'hooks'
import Link from 'next/link'
import PartyItemList from 'components/modules/party/PartyItemList'
import MyPartyItemList from 'components/modules/party/MyPartyItemList'
import CategoryFilter from 'components/modules/party/CategoryFilter'
import { useRouter } from 'next/router'
import _ from 'lodash'
import PartyDetailModal from 'components/modal/party/PartyDetailModal'

const PartyPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  const router = useRouter()
  const detailId = router.query.id

  const showDetailModal = !_.isNil(detailId)

  return (
    <div>
      {!team_profile && (
        <WhiteRoundedCard className="mb-4 cursor-pointer">
          <Link href="/team" passHref>
            <div>
              <span className="mr-2 text-3xl">👋</span> 계정에 회사를 연동하면
              동료들이 오늘 먹고싶은 점심 메뉴를 볼 수 있어요
            </div>
          </Link>
        </WhiteRoundedCard>
      )}
      {team_profile && (
        <div>
          <CategoryFilter />
          <div className="mb-4"></div>
          <PartyItemList />
        </div>
      )}{' '}
      {showDetailModal && <PartyDetailModal id={detailId} />}
    </div>
  )
}

export default PartyPage

PartyPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
