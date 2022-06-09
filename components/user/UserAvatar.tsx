import { FC, HTMLAttributes, useState } from 'react'
import { TeamMember } from '@/type/user'
import Image from 'next/image'
import { Tooltip, UserDetailModal } from '@/components'
import classNames from 'classnames'

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: TeamMember
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const UserAvatar: FC<UserAvatarProps> = ({
  user,
  size = 'small',
  className,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        { 'h-6 w-6': size === 'small' },
        { 'h-36 w-36': size === 'large' },
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
        <div className="flex h-6 w-6 cursor-default items-center justify-center rounded-full border border-gray-300 bg-white text-center text-xs">
          {user.member_name && user.member_name[0]}
        </div>
      )}
    </div>
  )
}

export const UserAvatarTooltip: FC<UserAvatarProps> = ({ user }) => {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)

  return (
    <>
      <Tooltip tooltipText={user.member_name || ''}>
        <UserAvatar user={user} onClick={() => setDetailModalOpen(true)} />
      </Tooltip>
      <UserDetailModal
        user={user}
        isOpen={isDetailModalOpen}
        setIsOpen={setDetailModalOpen}
      />
    </>
  )
}
