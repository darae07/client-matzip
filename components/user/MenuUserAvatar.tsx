import { useAppSelector } from '@/utils/hooks'
import { FC, Fragment } from 'react'
import { UserCircleIcon, KeyIcon, LogoutIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'
import {
  PopoverContainer,
  PopoverItem,
  UserAvatar,
  openToast,
  Popover,
} from '@/components'
import { useAppDispatch } from '@/utils/hooks'
import { logout } from '@/api'
import { PartyMembership } from '@/type'
import {
  useAcceptInvitePartyMutation,
  useCancelInvitePartyMutation,
  useMyPartyInvitedQuery,
  useRefuseInvitePartyMutation,
} from '@/queries'

const MenuUserAvatar: FC = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  const { data, hasNextPage } = useMyPartyInvitedQuery()

  const acceptMutation = useAcceptInvitePartyMutation()

  const handleAccept = (id: number) => {
    acceptMutation.mutate(id)
  }

  const refuseMutation = useRefuseInvitePartyMutation()
  const handleRefuse = (id: number) => {
    refuseMutation.mutate(id)
  }

  const cancelMutation = useCancelInvitePartyMutation()
  const handleCancel = (id: number) => {
    cancelMutation.mutate(id)
  }

  return (
    <div className="inline-block">
      {user ? (
        <Popover>
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

          <Popover.Panel className="sm:w-[14rem] ">
            <PopoverContainer>
              {user.team_profile ? (
                <PopoverItem href="/">
                  <UserCircleIcon className="h-4 w-4" />
                  <div className="ml-4">
                    <p className="font-semibold">
                      {user.team_profile.member_name}
                    </p>
                    <p className="text-sm font-medium ">내 프로필 보기</p>
                  </div>
                </PopoverItem>
              ) : (
                <PopoverItem href="/team">
                  <UserCircleIcon className="h-4 w-4" />
                  <div className="ml-4">
                    <p className="text-sm font-medium ">계정에 회사 연동하기</p>
                  </div>
                </PopoverItem>
              )}
              {data && (
                <div>
                  {!!data.pages[0].count && (
                    <p className="ml-1 border-t border-t-gray-300 px-10 pt-4 text-sm font-bold text-gray-600">
                      나의 파티 초대 요청
                    </p>
                  )}
                  {data.pages.map((group, i) => (
                    <Fragment key={i}>
                      {group.results.map((membership: PartyMembership) => (
                        <PopoverItem key={membership.id}>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <UserAvatar user={membership.team_member} />
                              <span className="ml-2 text-sm font-medium">
                                {membership.team_member.member_name}
                              </span>
                            </div>
                            <div className="float-right text-xs">
                              {membership.team_member.id ===
                                user?.team_profile?.id && (
                                <>
                                  <button
                                    onClick={() => handleAccept(membership.id)}
                                    type="button"
                                    className="mr-1 rounded bg-blue-100 p-1 text-blue-800"
                                  >
                                    수락
                                  </button>
                                  <button
                                    onClick={() => handleRefuse(membership.id)}
                                    type="button"
                                    className="rounded bg-red-100 p-1 text-red-800"
                                  >
                                    거절
                                  </button>
                                </>
                              )}
                              {membership.invite_member?.id ===
                                user?.team_profile?.id && (
                                <button
                                  onClick={() => handleCancel(membership.id)}
                                  type="button"
                                  className="rounded bg-gray-100 p-1 text-gray-600"
                                >
                                  요청 취소
                                </button>
                              )}
                            </div>
                          </div>
                        </PopoverItem>
                      ))}
                    </Fragment>
                  ))}
                </div>
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
                <div className="ml-4 hover:cursor-pointer">
                  <p className="text-sm font-medium text-red-500">로그아웃</p>
                </div>
              </PopoverItem>
            </PopoverContainer>
          </Popover.Panel>
        </Popover>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </div>
  )
}

export default MenuUserAvatar
