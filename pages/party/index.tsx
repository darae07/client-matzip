import HomeLayout from 'components/layout/HomeLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from 'type/ui'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { useAppSelector } from 'hooks'
import Link from 'next/link'
import PartyItemList from 'components/modules/party/PartyItemList'

const PartyPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  return (
    <div>
      party
      {!team_profile && (
        <WhiteRoundedCard className="mb-4 cursor-pointer">
          <Link href="/team">
            <div>
              <span className="mr-2 text-3xl">👋</span> 계정에 회사를 연동하면
              동료들이 오늘 먹고싶은 점심 메뉴를 볼 수 있어요
            </div>
          </Link>
        </WhiteRoundedCard>
      )}
      {team_profile && <PartyItemList />}
    </div>
  )
}

export default PartyPage

PartyPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
