import { useAppSelector } from 'hooks'
import { FC, Fragment } from 'react'
import { UserCircleIcon, KeyIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { PopoverContainer, PopoverItem } from 'components/popover/styledPopover'

const MenuUserAvatar: FC = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)

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
                  <Popover.Panel className="z-15 max-w-32 absolute right-0 mt-3 w-[12rem] px-4 sm:px-0 ">
                    <PopoverContainer>
                      <PopoverItem href="/">
                        <UserCircleIcon className="h-4 w-4" />
                        <div className="ml-4">
                          <p className="text-sm font-medium ">내 프로필 보기</p>
                        </div>
                      </PopoverItem>
                      <div className="w-full border border-b-gray-50"></div>
                      <PopoverItem href="/">
                        <KeyIcon className="h-4 w-4" />
                        <div className="ml-4">
                          <p className="text-sm font-medium ">계정 설정</p>
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
