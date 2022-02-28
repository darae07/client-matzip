import { useAppSelector } from 'hooks'
import { FC } from 'react'
import { UserCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'

const MenuUserAvatar: FC = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)

  return (
    <div className="inline-block">
      {user ? (
        <div>
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
        </div>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </div>
  )
}

export default MenuUserAvatar
