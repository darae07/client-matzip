import { LayoutProps } from 'type/ui'
import OurMatzipLogo from 'public/icon/our_matzip_logo.svg'
import { UserCircleIcon, BellIcon } from '@heroicons/react/outline'
import MainHeaderTab from 'components/tabs/MainNavigationTab'

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <>
      <header className="">
        <div className="flex items-center justify-between py-2.5 md:container md:mx-auto">
          <OurMatzipLogo width={160} className="w-[6rem] md:w-[8rem]" />
          <MainHeaderTab />
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
