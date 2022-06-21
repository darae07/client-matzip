import {
  HomeLayout,
  LoadingSpinner,
  openToast,
  SmallBlueButton,
  UserAvatarTooltip,
  WhiteRoundedCard,
} from '@/components'
import { useCrewItemQuery } from '@/queries'
import { NextPageWithLayout } from '@/type'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import Image from 'next/image'
import { LightBulbIcon, PlusIcon } from '@heroicons/react/outline'

const CrewDetail: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, error, isLoading } = useCrewItemQuery(id)

  useEffect(() => {
    if (error) {
      openToast(error.response.data.message || '크루를 찾을 수 없습니다.')
      if (!isLoading) {
        router.back()
      }
    }
  }, [error])

  const createLunch = () => {}

  if (isLoading) {
    return (
      <div className="mt-10 mb-5 flex w-full justify-center">
        <LoadingSpinner width={30} height={30} />
      </div>
    )
  }
  if (data) {
    return (
      <div>
        <WhiteRoundedCard>
          <div className="flex">
            <div className="relative mr-4 h-24 w-24 shrink-0 rounded-lg bg-gray-100">
              {data.image && (
                <Image
                  src={data.image}
                  alt={data.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              )}
            </div>
            <p className="text-xl font-bold font-bold">{data.name}</p>
            <p className="mt-2">{data.title}</p>
          </div>
          <div className="my-4 flex -space-x-1 border border-white border-y-gray-200 py-3">
            {data.membership.map((membership) => (
              <UserAvatarTooltip
                user={membership.team_member}
                key={membership.id}
                membership={membership}
              />
            ))}
          </div>
        </WhiteRoundedCard>

        <WhiteRoundedCard className="my-4 flex justify-between">
          <div className="flex">
            <LightBulbIcon className="mr-2 h-5 w-5" /> 함께 먹고 싶은 메뉴가
            있나요? 동료들이 오늘 먹고 싶은 메뉴에요.
          </div>

          <SmallBlueButton onClick={createLunch} className="my-auto ">
            <PlusIcon className="h-4 w-4" />
          </SmallBlueButton>
        </WhiteRoundedCard>
      </div>
    )
  }
  return <></>
}

export default CrewDetail

CrewDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
