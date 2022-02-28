import { LayoutProps } from 'type/ui'
import OurMatzipLogo from 'public/icon/our_matzip_logo.svg'
import { UserCircleIcon, BellIcon } from '@heroicons/react/outline'
import MainHeaderTab from 'components/tabs/MainNavigationTab'
import MenuUserAvatar from 'components/user/MenuUserAvatar'

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-50">
      <header className="sticky top-0 z-10 bg-white drop-shadow-sm">
        <div className=" flex items-center justify-between py-2.5 px-3 md:container md:mx-auto md:px-0">
          <OurMatzipLogo width={160} className="w-[6rem] md:w-[8rem]" />
          <MainHeaderTab />
          <div>
            <button className="mr-2">
              <BellIcon className="h-6 w-6" />
            </button>
            <MenuUserAvatar />
          </div>
        </div>
      </header>
      <section className="h-screen overflow-y-auto md:container md:mx-auto">
        {children}
      </section>
    </div>
  )
}
