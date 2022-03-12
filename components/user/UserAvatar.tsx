import { FC } from 'react'
import { TeamMember } from 'type/user'
import Image from 'next/image'
import Tooltip from 'components/popover/Tooltip'

type UserAvatarProps = {
  user: TeamMember
}

export const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <div>
      {user.image ? (
        <Image
          width={24}
          height={24}
          src={user.image}
          className="h-6 w-6 rounded-full"
        />
      ) : (
        <div className="flex h-6 w-6 cursor-default items-center justify-center rounded-full border border-gray-300 text-center text-xs">
          {user.member_name && user.member_name[0]}
        </div>
      )}
    </div>
  )
}

export const UserAvatarTooltip: FC<UserAvatarProps> = ({ user }) => {
  return (
    <Tooltip tooltipText={user.member_name || ''}>
      <UserAvatar user={user} />
    </Tooltip>
  )
}