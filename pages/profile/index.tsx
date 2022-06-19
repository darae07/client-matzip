import { ReactElement } from 'react'
import { HomeLayout, UserAvatar, WhiteRoundedCard } from '@/components'
import { NextPageWithLayout } from '@/type'
import { useAppSelector } from '@/utils/hooks'

const ProfilePage: NextPageWithLayout = () => {
  const { isLoading, user } = useAppSelector((state) => state.user)

  return (
    <div>
      {user?.team_profile && (
        <WhiteRoundedCard className="mb-4">
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
