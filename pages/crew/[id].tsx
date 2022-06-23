import _ from 'lodash'
import {
  Button,
  HomeLayout,
  LoadingSpinner,
  Modal,
  openToast,
  PlusButton,
  SearchAndSelectUser,
  SmallBlueButton,
  UserAvatarTooltip,
  WhiteRoundedCard,
} from '@/components'
import {
  useCrewItemQuery,
  useInviteCrewMutation,
  useOutCrewMutation,
} from '@/queries'
import { CrewMembership, NextPageWithLayout } from '@/type'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import Image from 'next/image'
import { LightBulbIcon, PencilIcon, PlusIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@/utils/hooks'

const CrewDetail: NextPageWithLayout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { data, error, isLoading } = useCrewItemQuery(id)

  useEffect(() => {
    if (error) {
      openToast(error.response.data.message || '크루를 찾을 수 없습니다.')
      if (!isLoading) {
        router.back()
      }
    }
  }, [error])

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const [myMembership, setMyMembership] = useState<CrewMembership>()
  useEffect(() => {
    if (data && data?.membership && team_profile?.id) {
      const my_membership = _.find(
        data.membership,
        (e) => e.team_member.id === team_profile?.id,
      )
      setMyMembership(my_membership)
    }
  }, [data, team_profile])

  const outMutation = useOutCrewMutation(setMyMembership, id)
  const handleOutCrew = () => outMutation.mutate(myMembership?.id)

  const [isSearchModalOpen, setSearchModalOpen] = useState(false)
  const openSearchModal = () => setSearchModalOpen(true)
  const closeSearchModal = () => setSearchModalOpen(false)

  const inviteMutation = useInviteCrewMutation()
  const userSelectAction = (receiverId: number) => {
    const data = {
      crew: id,
      receiver: receiverId,
    }
    inviteMutation.mutate(data)
    queryClient.invalidateQueries('member')
  }

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
          <div className="relative flex">
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
            <div>
              <p className="text-xl font-bold font-bold">{data.name}</p>
              <p className="mt-2">{data.title}</p>
            </div>
            <Button
              color="white"
              size="small"
              className="absolute top-0 right-0 flex items-center rounded-xl"
              onClick={() => router.push(`/crew/edit?id=${id}`)}
            >
              <PencilIcon className="mr-1 h-5 w-5" />
              <span>수정</span>
            </Button>
          </div>
          <div className="my-4 flex justify-between border border-white border-y-gray-200 py-3">
            <div className="flex -space-x-1">
              {data.membership.map((membership) => (
                <UserAvatarTooltip
                  user={membership.team_member}
                  key={membership.id}
                  membership={membership}
                />
              ))}
              {!!myMembership && <PlusButton onClick={openSearchModal} />}
              <Modal handleClose={closeSearchModal} isOpen={isSearchModalOpen}>
                <SearchAndSelectUser
                  selectAction={userSelectAction}
                  party={Number(id)}
                  mutatonState={inviteMutation}
                />
              </Modal>
            </div>
            {!!myMembership && (
              <Button
                onClick={() => handleOutCrew()}
                size="small"
                color="blue"
                disabled={outMutation.isLoading}
              >
                나가기
              </Button>
            )}
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
