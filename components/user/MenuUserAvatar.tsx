import { useAppSelector } from '@/utils/hooks'
import { FC, Fragment } from 'react'
import { UserCircleIcon, KeyIcon, LogoutIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import { PopoverContainer, PopoverItem } from '@/components/popover/styledPopover'
import { useAppDispatch } from '@/utils/hooks'
import { logout } from '@/api/auth/login'

const MenuUserAvatar: FC = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="inline-block">
      {user ? (
        <div>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button>
                  {user.team_profile && user.team_profile.image ? (
                    <Image
                      src={user.team_profile.image}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full"
                      alt="user-image"
                    />
                  ) : (
                    <UserCircleIcon className="h-6 w-6" />
                  )}
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="max-w-32 absolute right-0 z-20 mt-1 min-w-[16rem] bg-white px-4 sm:px-0 md:min-w-[14rem]">
                    <PopoverContainer>
                      {user.team_profile ? (
                        <PopoverItem href="/">
                          <UserCircleIcon className="h-4 w-4" />
                          <div className="ml-4">
                            <p className="font-semibold">
                              {user.team_profile.member_name}
                            </p>
                            <p className="text-sm font-medium ">
                              내 프로필 보기
                            </p>
                          </div>
                        </PopoverItem>
                      ) : (
                        <PopoverItem href="/team">
                          <UserCircleIcon className="h-4 w-4" />
                          <div className="ml-4">
                            <p className="text-sm font-medium ">
                              계정에 회사 연동하기
                            </p>
                          </div>
                        </PopoverItem>
                      )}
                      <div className="w-full border border-b-gray-50"></div>
                      <PopoverItem href="/">
                        <KeyIcon className="h-4 w-4" />
                        <div className="ml-4">
                          <p className="text-sm font-medium ">계정 설정</p>
                        </div>
                      </PopoverItem>
                      <PopoverItem onClick={handleLogout}>
                        <LogoutIcon className="h-4 w-4 text-red-500" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-red-500">
                            로그아웃
                          </p>
                        </div>
                      </PopoverItem>
                    </PopoverContainer>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </div>
  )
}

export default MenuUserAvatar
