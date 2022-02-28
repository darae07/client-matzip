import { FC } from 'react'
import {
  LightBulbIcon,
  UserGroupIcon,
  LocationMarkerIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import styled from 'styled-components'
import tw from 'twin.macro'

const MainHeaderTab: FC = () => {
  return (
    <div className="flex">
      <TabItem>
        <LightBulbIcon />
        <span>오늘의 메뉴</span>
      </TabItem>
      <TabItem>
        <UserGroupIcon />
        <span>크루</span>
      </TabItem>
      <TabItem>
        <LocationMarkerIcon />
        <span>회사/주변</span>
      </TabItem>
      <TabItem>
        <HomeIcon />
        <span>홈</span>
      </TabItem>
    </div>
  )
}

export default MainHeaderTab

const TabItem = styled.button.attrs({
  className: 'flex items-center flex-col text-sm p-2 md:w-24 ',
})`
  & {
    svg {
      ${tw`h-6 w-6`}
    }
    span {
      ${tw`hidden md:block mt-1`}
    }
  }
`
