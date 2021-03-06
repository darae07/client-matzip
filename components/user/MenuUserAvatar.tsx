import { useAppSelector } from '@/utils/hooks'
import { FC, Fragment } from 'react'
import { UserCircleIcon, KeyIcon, LogoutIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'
import {
  PopoverContainer,
  UserAvatar,
  Popover,
  LoadingSpinner,
} from '@/components'
import { useAppDispatch } from '@/utils/hooks'
import { logout } from '@/api'
import { CrewMembership, PartyMembership } from '@/type'
import {
  useAcceptInviteCrewMutation,
  useAcceptInvitePartyMutation,
  useCancelInviteCrewMutation,
  useCancelInvitePartyMutation,
  useMyCrewInvitedQuery,
  useMyPartyInvitedQuery,
  useRefuseInviteCrewMutation,
  useRefuseInvitePartyMutation,
} from '@/queries'
import { useQueryClient } from 'react-query'

const MenuUserAvatar: FC = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)
  const queryClient = useQueryClient()

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
    queryClient.clear()
  }

  const partyInviteList = useMyPartyInvitedQuery()
  const acceptPartyMutation = useAcceptInvitePartyMutation()
  const handlePartyAccept = (id: number) => acceptPartyMutation.mutate(id)
  const refusePartyMutation = useRefuseInvitePartyMutation()
  const handlePartyRefuse = (id: number) => refusePartyMutation.mutate(id)
  const cancelPartyMutation = useCancelInvitePartyMutation()
  const handlePartyCancel = (id: number) => cancelPartyMutation.mutate(id)

  const crewInviteList = useMyCrewInvitedQuery()
  const acceptCrewMutation = useAcceptInviteCrewMutation()
  const handleCrewAccept = (id: Number) => acceptCrewMutation.mutate(id)
  const refuseCrewMutation = useRefuseInviteCrewMutation()
  const handleCrewRefuse = (id: number) => refuseCrewMutation.mutate(id)
  const cancelCrewMutation = useCancelInviteCrewMutation()
  const handleCrewCancel = (id: number) => cancelCrewMutation.mutate(id)

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
                <Popover.Item href="/profile">
                  <UserCircleIcon className="h-4 w-4" />
                  <div className="ml-4">
                    <p className="font-semibold">
                      {user.team_profile.member_name}
                    </p>
                    <p className="text-sm font-medium ">??? ????????? ??????</p>
                  </div>
                </Popover.Item>
              ) : (
                <Popover.Item href="/team">
                  <UserCircleIcon className="h-4 w-4" />
                  <div className="ml-4">
                    <p className="text-sm font-medium ">????????? ?????? ????????????</p>
                  </div>
                </Popover.Item>
              )}
              {partyInviteList.isLoading && (
                <div className="flex w-full justify-center py-3">
                  <LoadingSpinner width={16} height={16} />
                </div>
              )}
              {partyInviteList.data && (
                <div>
                  {!!partyInviteList.data.pages[0].count && (
                    <p className="ml-1 border-t border-t-gray-300 px-10 pt-4 text-sm font-bold text-gray-600">
                      ?????? ?????? ?????? ??????
                    </p>
                  )}
                  {partyInviteList.data.pages.map((group, i) => (
                    <Fragment key={i}>
                      {group.results.map((membership: PartyMembership) => (
                        <Popover.Item key={membership.id}>
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
                                    onClick={() =>
                                      handlePartyAccept(membership.id)
                                    }
                                    type="button"
                                    className="mr-1 rounded bg-blue-100 p-1 text-blue-800"
                                  >
                                    ??????
                                  </button>
                                  <button
                                    onClick={() =>
                                      handlePartyRefuse(membership.id)
                                    }
                                    type="button"
                                    className="rounded bg-red-100 p-1 text-red-800"
                                  >
                                    ??????
                                  </button>
                                </>
                              )}
                              {membership.invite_member?.id ===
                                user?.team_profile?.id && (
                                <button
                                  onClick={() =>
                                    handlePartyCancel(membership.id)
                                  }
                                  type="button"
                                  className="rounded bg-gray-100 p-1 text-gray-600"
                                >
                                  ?????? ??????
                                </button>
                              )}
                            </div>
                          </div>
                        </Popover.Item>
                      ))}
                    </Fragment>
                  ))}
                </div>
              )}

              {crewInviteList.isLoading && (
                <div className="flex w-full justify-center py-3">
                  <LoadingSpinner width={16} height={16} />
                </div>
              )}
              {crewInviteList.data && (
                <div>
                  {!!crewInviteList.data.pages[0].count && (
                    <p className="ml-1 border-t border-t-gray-300 px-10 pt-4 text-sm font-bold text-gray-600">
                      ?????? ?????? ?????? ??????
                    </p>
                  )}
                  {crewInviteList.data.pages.map((group, i) => (
                    <Fragment key={i}>
                      {group.results.map((membership: CrewMembership) => (
                        <Popover.Item key={membership.id}>
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
                                    onClick={() =>
                                      handleCrewAccept(membership.id)
                                    }
                                    type="button"
                                    className="mr-1 rounded bg-blue-100 p-1 text-blue-800"
                                  >
                                    ??????
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleCrewRefuse(membership.id)
                                    }
                                    type="button"
                                    className="rounded bg-red-100 p-1 text-red-800"
                                  >
                                    ??????
                                  </button>
                                </>
                              )}
                              {membership.invite_member?.id ===
                                user?.team_profile?.id && (
                                <button
                                  onClick={() =>
                                    handleCrewCancel(membership.id)
                                  }
                                  type="button"
                                  className="rounded bg-gray-100 p-1 text-gray-600"
                                >
                                  ?????? ??????
                                </button>
                              )}
                            </div>
                          </div>
                        </Popover.Item>
                      ))}
                    </Fragment>
                  ))}
                </div>
              )}
              <div className="w-full border border-b-gray-50"></div>
              <Popover.Item href="/">
                <KeyIcon className="h-4 w-4" />
                <div className="ml-4">
                  <p className="text-sm font-medium ">?????? ??????</p>
                </div>
              </Popover.Item>
              <Popover.Item onClick={handleLogout}>
                <LogoutIcon className="h-4 w-4 text-red-500" />
                <div className="ml-4 hover:cursor-pointer">
                  <p className="text-sm font-medium text-red-500">????????????</p>
                </div>
              </Popover.Item>
            </PopoverContainer>
          </Popover.Panel>
        </Popover>
      ) : (
        <Link href="/login">?????????</Link>
      )}
    </div>
  )
}

export default MenuUserAvatar
