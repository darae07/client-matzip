import _ from 'lodash'
import { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { NextPageWithLayout, PaginatedResult, Party } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { listParty } from '@/api'
import { CategoryName, CategoryFilter } from '@/components/modules'
import { ListItem, UserAvatarTooltip, PartyDetailModal, WhiteRoundedCard, HomeLayout } from '@/components'

const PartyPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  const router = useRouter()
  const detailId = router.query.id

  const showDetailModal = !_.isNil(detailId)

  const { data, error, isLoading } = useQuery<PaginatedResult<Party>>(
    ['party'],
    listParty,
    { enabled: !!team_profile }
  )

  if (team_profile) {
    return (
      <div>
        <CategoryFilter />
        <div className="mb-4"></div>
        <ul className="grid gap-4 md:grid-cols-3">
          {data?.results?.map((party: Party) => (
            <Link
              href={`/party?id=${party.id}`}
              as={`/party/${party.id}`}
              scroll={false}
              passHref
              key={party.id}
            >
              <ListItem >
                <div className="mb-1 flex items-center">
                  <CategoryName category={party.keyword.category} className='mr-2' />
                  <p className="text-lg font-bold">{party.name}</p>
                </div>

                <span className="text-blue-500">#{party.keyword.name}</span>

                <div className="my-4 flex -space-x-1 border border-white border-y-gray-200 py-3">
                  {party.membership.map((membership) => (
                    <UserAvatarTooltip
                      user={membership.team_member}
                      key={membership.id}
                    />
                  ))}
                </div>
              </ListItem>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  else {
    <WhiteRoundedCard className="mb-4 cursor-pointer">
      <Link href="/team" passHref>
        <div>
          <span className="mr-2 text-3xl">👋</span> 계정에 회사를 연동하면
          동료들이 오늘 먹고싶은 점심 메뉴를 볼 수 있어요
        </div>
      </Link>
    </WhiteRoundedCard>
  }

  return (
    <div>
      {showDetailModal && <PartyDetailModal id={detailId} />}
    </div>
  )
}

export default PartyPage

PartyPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
