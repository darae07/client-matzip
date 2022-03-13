import { retrieveParty } from 'api/party/read'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import PageModal from '../PageModal'
import { UserAvatarTooltip } from 'components/user/UserAvatar'
import { Party } from 'type/party'
import { KakaoMap } from 'components/modules/keyword'
import { useAppSelector } from 'hooks'
import { retrieveTeam } from 'api/team'
import { Team } from 'type/team'

const PartyDetailModal: FC = () => {
  const router = useRouter()
  const closeModal = () => router.push('/party')
  const { id } = router.query

  const { data, error, isLoading } = useQuery(
    ['partyItem', id],
    () => retrieveParty<Party>(id),
    { enabled: !!id },
  )

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const myTeam = useQuery(
    ['myTeam', teamId],
    () => retrieveTeam<Team>(teamId),
    {
      enabled: !!teamId,
    },
  )
  if (data)
    return (
      <div>
        <WhiteRoundedCard className="mb-4">
          <div className="mb-1 flex items-center">
            <span className="mr-2 rounded border border-blue-500 p-1 text-xs text-blue-500">
              {data.keyword.category?.name}
            </span>
            <p className="text-lg font-bold">{data.name}</p>
          </div>

          <span className="text-blue-500">#{data.keyword.name}</span>

          <div className="my-4 flex justify-between border border-white border-y-gray-200 py-3">
            <div className="flex -space-x-1">
              {data.membership.map((membership) => (
                <UserAvatarTooltip
                  user={membership.team_member}
                  key={membership.id}
                />
              ))}
            </div>
            <div>
              <button className="rounded bg-blue-600 p-2 px-3 text-sm text-white">
                같이갈래요
              </button>
            </div>
          </div>
        </WhiteRoundedCard>
        {myTeam.data && (
          <WhiteRoundedCard className="h-72">
            <KakaoMap
              location={myTeam.data.location}
              keyword={data.keyword.name}
            />
          </WhiteRoundedCard>
        )}
      </div>
    )
  return <></>
}

export default PartyDetailModal
