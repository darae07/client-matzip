import _ from 'lodash'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import { useInfiniteQuery } from 'react-query'
import { NextPageWithLayout, PaginatedResult, Party } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { listParty } from '@/api'
import { CategoryName, CategoryFilter } from '@/components/modules'
import {
  ListItem,
  UserAvatarTooltip,
  WhiteRoundedCard,
  HomeLayout,
  InfiniteScroll,
} from '@/components'

const PartyPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginatedResult<Party>>(
      'party',
      ({ pageParam = 1 }) => listParty(pageParam),
      {
        enabled: !!team_profile,
        keepPreviousData: true,
        getNextPageParam: (lastPage, pages) => lastPage.next,
        cacheTime: 1000 * 60 * 60,
      },
    )

  if (!team_profile) {
    return (
      <WhiteRoundedCard className="mb-4 cursor-pointer">
        <Link href="/team" passHref>
          <div>
            <span className="mr-2 text-3xl">👋</span> 계정에 회사를 연동하면
            동료들이 오늘 먹고싶은 점심 메뉴를 볼 수 있어요
          </div>
        </Link>
      </WhiteRoundedCard>
    )
  }
  return (
    <div>
      <CategoryFilter className="mb-4" />

      <ul className="grid gap-4 md:grid-cols-3">
        {data?.pages?.map((group, i) => (
          <React.Fragment key={i}>
            {group.results.map((party: Party) => (
              <ListItem key={party.id}>
                <Link href={`/party/${party.id}`} scroll={false} key={party.id}>
                  <React.Fragment>
                    <div className="mb-1 flex items-center">
                      <CategoryName
                        category={party.keyword?.category}
                        className="mr-2"
                      />
                      <p className="text-lg font-bold">{party.name}</p>
                    </div>

                    <span className="text-blue-500">
                      #{party.keyword?.name}
                    </span>

                    <div className="my-4 flex -space-x-1 border border-white border-y-gray-200 py-3">
                      {party.membership.map((membership) => (
                        <UserAvatarTooltip
                          user={membership.team_member}
                          key={membership.id}
                        />
                      ))}
                    </div>
                  </React.Fragment>
                </Link>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <InfiniteScroll
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  )
}

export default PartyPage

PartyPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
