import { FC, HTMLAttributes, useState } from 'react'
import { TeamMember, PartyMembership, PartyMembershipStatus } from '@/type'
import Image from 'next/image'
import { Tooltip, UserDetailModal } from '@/components'
import classNames from 'classnames'

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: TeamMember
  size?: 'small' | 'medium' | 'large'
  className?: string
  membership?: PartyMembership
}

export const UserAvatar: FC<UserAvatarProps> = ({
  user,
  size = 'small',
  className,
  membership,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        { 'h-6 w-6': size === 'small' },
        { 'h-36 w-36': size === 'large' },
        { 'opacity-50': membership?.status === 2 },
        'relative',
        className,
      )}
      onClick={onClick}
    >
      {user.image ? (
        <Image
          layout="fill"
          src={user.image}
          className={classNames(
            { 'rounded-full': size === 'small' },
            { 'rounded-lg': size === 'large' },
          )}
          alt="user-image"
        />
      ) : (
        <div
          className={classNames(
            'flex cursor-default items-center justify-center border border-gray-300 bg-white text-center',
            { 'h-6 w-6 rounded-full text-xs': size === 'small' },
            { 'h-36 w-36 rounded-lg text-xl': size === 'large' },
          )}
        >
          {user.member_name && user.member_name[0]}
        </div>
      )}
    </div>
  )
}

export const UserAvatarTooltip: FC<UserAvatarProps> = ({
  user,
  membership,
}) => {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)

  return (
    <>
      <Tooltip
        tooltipText={
          `${membership?.status === 2 ? '초대중 ' : ''}${user.member_name}` ||
          ''
        }
      >
        <UserAvatar
          user={user}
          membership={membership}
          onClick={() => setDetailModalOpen(true)}
        />
      </Tooltip>
      <UserDetailModal
        user={user}
        isOpen={isDetailModalOpen}
        setIsOpen={setDetailModalOpen}
      />
    </>
  )
}
