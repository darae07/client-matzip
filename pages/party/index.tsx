import _ from 'lodash'
import React, { ReactElement, useState, Fragment, useLayoutEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import { NextPageWithLayout, PaginatedResult, PartyList } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { listParty } from '@/api'
import { CategoryName, KeywordName, SearchCategory } from '@/components/modules'
import {
  ListItem,
  UserAvatarTooltip,
  WhiteRoundedCard,
  HomeLayout,
  InfiniteScroll,
  LoadingSpinner,
  SamllLikeButton,
  SmallBlueButton,
} from '@/components'
import { PlusIcon, LightBulbIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { moveToScrollPosition, storeScrollPositionAndMoveToTop } from '@/utils'

const PartyPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  const [category, setCategory] = useState<number>()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery<PaginatedResult<PartyList>>(
    ['party', category],
    ({ pageParam = 1 }) => listParty(pageParam, category),
    {
      enabled: !!team_profile,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )

  const router = useRouter()
  const createParty = () => {
    router.push('/party/create')
  }

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
            동료들이 오늘 먹고싶은 점심 메뉴를 볼 수 있어요
          </div>
        </Link>
      </WhiteRoundedCard>
    )
  }
  return (
    <div>
      <WhiteRoundedCard className="mb-4 flex">
        <LightBulbIcon className="mr-2 h-5 w-5" /> 함께 먹고 싶은 메뉴가 있나요?
        동료들이 오늘 먹고 싶은 메뉴에요.
      </WhiteRoundedCard>

      <WhiteRoundedCard className="mb-4">
        <div className="flex justify-between">
          <div className=" border-r pr-4">
            <SearchCategory setCategory={setCategory} category={category} />
          </div>
          <div className="flex justify-between ">
            <SamllLikeButton className="my-auto ml-4 mr-2">
              <HeartIcon className="h-4 w-4" />
            </SamllLikeButton>
            <SmallBlueButton onClick={createParty} className="my-auto ">
              <PlusIcon className="h-4 w-4" />
            </SmallBlueButton>
          </div>
        </div>
      </WhiteRoundedCard>

      {isLoading ? (
        <div className="mt-10 mb-5 flex w-full justify-center">
          <LoadingSpinner width={30} height={30} />
        </div>
      ) : data?.pages && data.pages[0].count ? (
        <Fragment>
          <ul className="grid gap-4 md:grid-cols-3">
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.map((party: PartyList) => (
                  <ListItem
                    key={party.id}
                    isPreviousData={isFetching && !isFetchingNextPage}
                    thumbnailProps={{
                      src: party.image?.image,
                      alt: party.keyword?.category?.name,
                      href: `/party/${party.id}`,
                    }}
                  >
                    <WhiteRoundedCard
                      className="h-full"
                      flatTop={!!party.image?.image}
                    >
                      <Link
                        href={`/party/${party.id}`}
                        scroll={false}
                        key={party.id}
                        passHref
                      >
                        <div>
                          <p className="mb-2 text-xl font-bold font-bold">
                            {party.name}
                          </p>
                          <div className="mb-1 flex items-center">
                            <CategoryName
                              category={party.keyword?.category}
                              className="mr-2"
                            />
                            <KeywordName keyword={party.keyword} />
                          </div>

                          <p className="mt-3 max-h-14 overflow-hidden text-ellipsis text-sm text-gray-600">
                            {party.description}
                          </p>
                        </div>
                      </Link>
                      <div className="my-4 flex -space-x-1 border border-white border-y-gray-200 py-3">
                        {party.membership.map((membership) => (
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
              </React.Fragment>
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
          <p>먹고 싶은 메뉴가 없나요? 지금 등록해 보세요.</p>
        </Fragment>
      )}
    </div>
  )
}

export default PartyPage

PartyPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
