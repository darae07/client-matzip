import { ReactElement, useEffect } from 'react'
import { HomeLayout, UserAvatar, WhiteRoundedCard } from '@/components'
import { NextPageWithLayout } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { useRouter } from 'next/router'
import { PencilIcon } from '@heroicons/react/outline'

const ProfilePage: NextPageWithLayout = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.back()
    }
  }, [user])

  return (
    <div>
      {user?.team_profile && (
        <WhiteRoundedCard className="relative mb-4">
          <button
            type="button"
            onClick={() => router.push('/profile/edit')}
            className="borer-gray-400 absolute top-6 right-7 flex items-center rounded-xl border p-2 text-sm text-gray-500"
          >
            <PencilIcon className="mr-1 h-5 w-5" />
            <span>수정</span>
          </button>
          <div className="sm:flex">
            <UserAvatar user={user.team_profile} size="large" />
            <div className="mt-4 sm:ml-4 sm:mt-0">
              <p className="text-2xl font-bold">
                {user.team_profile.member_name}
              </p>
              <p className="">{user.team_profile.title}</p>

              <p className="mt-4">{user.email}</p>
              <p className="">{user.phone_number}</p>
            </div>
          </div>
        </WhiteRoundedCard>
      )}
    </div>
  )
}

export default ProfilePage

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
