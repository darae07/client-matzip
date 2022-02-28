import { WhiteRoundedCard } from 'components/card/styledCard'
import HomeLayout from 'components/layout/HomeLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from 'type/ui'

const TeamPage: NextPageWithLayout = () => {
  return (
    <div>
      <WhiteRoundedCard className="mb-4">
        <span className="mr-2 text-3xl">👋 </span>서비스가 처음이신가요? 회사를
        등록하고 동료들과 함께 점심을 즐기세요
      </WhiteRoundedCard>
      <WhiteRoundedCard className="mb-4">
        <span className="mr-2 text-3xl">🤝</span> 동료에게 입장 코드를
        공유받으셨나요? 입장 코드로 회사에 합류해 보세요
      </WhiteRoundedCard>
      <WhiteRoundedCard className="mb-4">회사 정보</WhiteRoundedCard>
      <WhiteRoundedCard className="mb-4">우리 회사 주변 맛집</WhiteRoundedCard>
    </div>
  )
}

export default TeamPage

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
