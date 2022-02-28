import { FC } from 'react'
import {
  LightBulbIcon,
  UserGroupIcon,
  LocationMarkerIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import Link from 'next/link'

const navigationTabList = [
  { icon: <LightBulbIcon />, href: '/party', text: '오늘의 메뉴' },
  { icon: <UserGroupIcon />, href: '/crew', text: '크루' },
  { icon: <LocationMarkerIcon />, href: '/team', text: '회사/주변' },
  { icon: <HomeIcon />, href: '/home', text: '홈' },
]

const MainNavigationTab: FC = () => {
  const router = useRouter()

  return (
    <div className="flex">
      {navigationTabList.map((nav) => (
        <Link href={nav.href}>
          <TabItem selected={nav.href === router.pathname}>
            {nav.icon}
            <span>{nav.text}</span>
          </TabItem>
        </Link>
      ))}
    </div>
  )
}

export default MainNavigationTab

const TabItem = styled.a<{ selected: boolean }>`
  ${tw`flex items-center flex-col text-xs p-2 md:w-24 rounded hover:bg-gray-50 cursor-pointer text-gray-500 font-bold`}
  & {
    svg {
      ${tw`h-6 w-6`}
    }
    span {
      ${tw`hidden md:block mt-1`}
    }
  }
  ${(props) => props.selected && tw`bg-gray-100`}
`
