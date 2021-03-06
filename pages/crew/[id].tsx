import _ from 'lodash'
import {
  Button,
  HomeLayout,
  InfiniteScroll,
  ListItem,
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
  useCreateVoteMutation,
  useCrewItemQuery,
  useInviteCrewMutation,
  useLunchQuery,
  useOutCrewMutation,
  useOutVoteMutation,
} from '@/queries'
import { CrewMembership, LunchList, NextPageWithLayout } from '@/type'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import Image from 'next/image'
import {
  LightBulbIcon,
  PencilIcon,
  PlusIcon,
  LogoutIcon,
  LoginIcon,
  ChartBarIcon,
} from '@heroicons/react/outline'
import { useAppSelector } from '@/utils/hooks'
import {
  CategoryName,
  EatModal,
  KeywordName,
  KeywordScore,
} from '@/components/modules'

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
  }, [error, isLoading, router])

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

  const lunches = useLunchQuery(id)
  const createLunch = () => router.push(`/lunch/create?id=${id}`)

  const createVoteMutation = useCreateVoteMutation(id)
  const handelCreateVote = (lunch: number) =>
    createVoteMutation.mutate({ lunch })
  const outVoteMutation = useOutVoteMutation(id)
  const handleOutVote = (lunch: number) => outVoteMutation.mutate(lunch)

  const [isEatModalOpen, setEatModalOpen] = useState(false)
  const openEatModal = (id: number) => {
    router.query.lunch = id + ''
    router.push(router)
    setEatModalOpen(true)
  }

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
            <div className="grow">
              <p className="text-xl font-bold font-bold">{data.name}</p>
              <p className="mt-2">{data.title}</p>
            </div>
            <Button
              color="white"
              size="xsmall"
              className="ml-2 flex h-fit shrink-0 grow-0 items-center rounded-xl"
              onClick={() => router.push(`/crew/edit?id=${id}`)}
            >
              <PencilIcon className="h-3 w-3 md:h-5 md:w-5" />
              <span className="ml-1 hidden md:block">수정</span>
            </Button>
          </div>
          <div className="my-4 flex justify-between border border-white border-y-gray-200 py-3">
            <div className="grid grid-cols-10 -space-x-1 md:flex md:grid-cols-none">
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

        {lunches.isLoading ? (
          <div className="mt-10 mb-5 flex w-full justify-center">
            <LoadingSpinner width={30} height={30} />
          </div>
        ) : lunches.data?.pages && lunches.data.pages[0].count ? (
          <Fragment>
            <EatModal
              isOpen={isEatModalOpen}
              setOpen={setEatModalOpen}
              domain="lunch"
            />
            <ul className="grid gap-4 md:grid-cols-3">
              {lunches.data.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((lunch: LunchList) => (
                    <ListItem
                      key={lunch.id}
                      isPreviousData={
                        lunches.isFetching && !lunches.isFetchingNextPage
                      }
                      thumbnailProps={{
                        src: lunch.image?.image,
                        alt: lunch.keyword?.category?.name,
                        href: `/keyword/${lunch.keyword?.id}`,
                      }}
                    >
                      <WhiteRoundedCard
                        className="h-full"
                        flatTop={!!lunch.image?.image}
                      >
                        <div className="relative">
                          <div className="mb-1 flex items-center">
                            <CategoryName
                              category={lunch.keyword?.category}
                              className="mr-2"
                            />
                            <KeywordName keyword={lunch.keyword} />
                            <KeywordScore
                              keyword={lunch.keyword}
                              className="absolute right-0"
                            />
                          </div>
                        </div>
                        <div className="relative my-4 flex items-center border border-white border-y-gray-200 py-3 text-gray-500">
                          <ChartBarIcon className="h-5 w-5 " />
                          <span className="ml-1 text-xs">
                            {lunch.votes.length}
                          </span>
                          <div className="ml-2 flex -space-x-1">
                            {lunch.votes.map((vote) => (
                              <UserAvatarTooltip
                                user={vote.team_member}
                                key={vote.id}
                              />
                            ))}
                          </div>
                          {!!myMembership && (
                            <div className="absolute right-0">
                              {!!lunch.votes.find(
                                (v) => v.team_member.id === team_profile?.id,
                              ) ? (
                                <Button
                                  onClick={() => handleOutVote(lunch.id)}
                                  color="red"
                                  size="xsmall"
                                >
                                  <LogoutIcon className="h-5 w-5" />
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handelCreateVote(lunch.id)}
                                  color="blue"
                                  size="xsmall"
                                >
                                  <LoginIcon className="h-5 w-5" />
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex w-full flex-row-reverse">
                          {lunch.eat ? (
                            <span className="text-sm">마감</span>
                          ) : (
                            <Button
                              onClick={() => openEatModal(lunch.id)}
                              size="small"
                              color="pink"
                            >
                              먹었어요
                            </Button>
                          )}
                        </div>
                      </WhiteRoundedCard>
                    </ListItem>
                  ))}
                </Fragment>
              ))}
            </ul>
            <InfiniteScroll
              fetchNextPage={lunches.fetchNextPage}
              isFetchingNextPage={lunches.isFetchingNextPage}
              hasNextPage={lunches.hasNextPage}
            />
          </Fragment>
        ) : (
          <Fragment>
            <p>먹고 싶은 메뉴가 없나요? 지금 등록해 보세요.</p>
          </Fragment>
        )}
      </div>
    )
  }
  return <></>
}

export default CrewDetail

CrewDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
