import { LayoutProps } from 'type/ui'
import OurMatzipLogo from 'public/icon/our_matzip_logo.svg'
import {
  UserCircleIcon,
  BellIcon,
  LightBulbIcon,
  UserGroupIcon,
  LocationMarkerIcon,
  HomeIcon,
} from '@heroicons/react/outline'

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <>
      <header className="">
        <div className="flex justify-between py-2.5 md:container md:mx-auto">
          <OurMatzipLogo width={160} className="w-[6rem] md:w-[8rem]" />
          <div>
            <button>
              <LightBulbIcon className="h-6 w-6" />
              <span className="">오늘의 메뉴</span>
            </button>
            <button>
              <UserGroupIcon className="h-6 w-6" />
              크루
            </button>
            <button>
              <LocationMarkerIcon className="h-6 w-6" /> 회사/주변
            </button>
            <button>
              <HomeIcon className="h-6 w-6" /> 홈
            </button>
          </div>
          <div>
            <button>
              <BellIcon className="h-6 w-6" />
            </button>
            <button>
              <UserCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <section className="md:container md:mx-auto">{children}</section>
    </>
  )
}
