import { ReactElement } from 'react'
import { NextPageWithLayout } from '@/type'
import { WhiteRoundedCard, HomeLayout } from '@/components'
import {
  LightBulbIcon,
  UserGroupIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline'

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <WhiteRoundedCard className="mb-4" role="today">
        오늘 뭐 먹지? 직장내 쉽고 빠른 점심메뉴 의사결정을 경험해 보세요
      </WhiteRoundedCard>
      <WhiteRoundedCard className="mb-4">
        <p className="flex font-bold text-blue-800">
          <LightBulbIcon className="h-6 w-6" />
          오늘의 메뉴
        </p>
        <p>
          오늘 점심으로 동료들이 먹고 싶은 메뉴에요. 같이 먹고 싶다면 참여하기를
          눌러 조인해 보세요.
        </p>
      </WhiteRoundedCard>
      <WhiteRoundedCard className="mb-4">
        <p className="flex font-bold text-blue-800">
          <UserGroupIcon className="h-6 w-6" />
          크루
        </p>
        <p>함께 점심을 먹는 동료들이 고정되어 있나요? 크루를 이루세요!</p>
        <p>크루 내에서 투표를 올려 오늘 메뉴를 빠르게 결정해 보세요.</p>
      </WhiteRoundedCard>
      <WhiteRoundedCard className="mb-4">
        <p className="flex font-bold text-blue-800">
          <LocationMarkerIcon className="h-6 w-6" />
          회사
        </p>
        <p>
          우리 회사 정보와 회사 주변의 동료들이 많이 찾은 맛집을 보여줍니다.
        </p>
      </WhiteRoundedCard>
    </div>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
