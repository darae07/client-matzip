import Link from 'next/link'
import { Fragment, ReactElement, useLayoutEffect, useState } from 'react'
import { Crew, NextPageWithLayout } from '@/type'
import {
  HomeLayout,
  InfiniteScroll,
  ListItem,
  LoadingSpinner,
  SmallBlueButton,
  UserAvatarTooltip,
  WhiteRoundedCard,
} from '@/components'
import { useAppSelector } from '@/utils/hooks'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useCrewQuery } from '@/queries'
import { moveToScrollPosition, storeScrollPositionAndMoveToTop } from '@/utils'
import Image from 'next/image'

const CrewPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useCrewQuery()

  const router = useRouter()
  const createCrew = () => router.push('/crew/create')

  useLayoutEffect(() => {
    moveToScrollPosition()
    return () => {
      storeScrollPositionAndMoveToTop()
    }
  }, [])

  if (!team_profile) {
    return (
      <WhiteRoundedCard className="mb-4 cursor-pointer">
        <Link href="/team" passHref>
          <div>
            <span className="mr-2 text-3xl">👋</span> 계정에 회사를 연동하면
            점심을 함께 먹는 동료들과 크루를 구성할 수 있어요
          </div>
        </Link>
      </WhiteRoundedCard>
    )
  }

  return (
    <div>
      <WhiteRoundedCard className="mb-4 flex flex-row-reverse">
        <SmallBlueButton onClick={createCrew} className="my-auto ">
          <PlusIcon className="h-4 w-4" />
        </SmallBlueButton>
      </WhiteRoundedCard>

      {isLoading ? (
        <div className="mt-10 mb-5 flex w-full justify-center">
          <LoadingSpinner width={30} height={30} />
        </div>
      ) : data?.pages && data.pages[0].count ? (
        <Fragment>
          <ul className="grid gap-4 md:grid-cols-3">
            {data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.results.map((crew: Crew) => (
                  <ListItem
                    key={crew.id}
                    isPreviousData={isFetching && !isFetchingNextPage}
                  >
                    <WhiteRoundedCard className="h-full" flatTop={!!crew.image}>
                      <Link
                        href={`/crew/${crew.id}`}
                        scroll={false}
                        key={crew.id}
                        passHref
                      >
                        <div className="flex">
                          <div className="relative mr-4 h-24 w-24 shrink-0 rounded-lg bg-gray-100">
                            {crew.image && (
                              <Image
                                src={crew.image}
                                alt={crew.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-xl font-bold font-bold">
                              {crew.name}
                            </p>
                            <p className="mt-2">{crew.title}</p>
                          </div>
                        </div>
                      </Link>
                      <div className="my-4 flex -space-x-1 border border-white border-y-gray-200 py-3">
                        {crew.membership.map((membership) => (
                          <UserAvatarTooltip
                            user={membership.team_member}
                            key={membership.id}
                            membership={membership}
                          />
                        ))}
                      </div>
                    </WhiteRoundedCard>
                  </ListItem>
                ))}
              </Fragment>
            ))}
          </ul>
          <InfiniteScroll
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            찾고 있는 크루가 없나요? 지금 등록하거나 동료에게 초대를 부탁하세요.
          </p>
        </Fragment>
      )}
    </div>
  )
}

export default CrewPage

CrewPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
