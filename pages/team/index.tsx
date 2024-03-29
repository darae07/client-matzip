import { ReactElement } from 'react'
import { NextPageWithLayout } from '@/type/ui'
import Link from 'next/link'
import { WhiteRoundedCard, HomeLayout } from '@/components'
import {
  TeamInformation,
  FindTeamModal,
  CreateTeamModal,
} from '@/components/modules'
import { useAppSelector } from '@/utils/hooks'

const TeamPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  return (
    <div>
      {!team_profile && (
        <>
          <Link href="/team" as="/team/find" passHref>
            <WhiteRoundedCard className="mb-4 cursor-pointer">
              <span className="mr-2 text-3xl">🤝</span> 동료에게 입장 코드를
              공유받으셨나요? 입장 코드로 회사에 합류해 보세요
            </WhiteRoundedCard>
          </Link>

          <Link href="/team" as="/team/create" passHref>
            <WhiteRoundedCard className="mb-4 cursor-pointer">
              <span className="mr-2 text-3xl">👋 </span>서비스가 처음이신가요?
              회사를 등록하고 동료을 초대해서 함께 점심을 즐기세요
            </WhiteRoundedCard>
          </Link>
        </>
      )}
      {!!team_profile && (
        <>
          <WhiteRoundedCard className="mb-4">
            <span className="mr-2 text-3xl">🤝</span> 동료에게 입장 코드를
            공유해 보세요
          </WhiteRoundedCard>
          <div className="mb-4">
            <TeamInformation />
          </div>
          <WhiteRoundedCard className="mb-4">
            우리 회사 주변 맛집
          </WhiteRoundedCard>
        </>
      )}

      <CreateTeamModal />
      <FindTeamModal />
    </div>
  )
}

export default TeamPage

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
