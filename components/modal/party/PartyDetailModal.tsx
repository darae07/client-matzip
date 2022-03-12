import { retrieveParty } from 'api/party/read'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import PageModal from '../PageModal'
import { UserAvatarTooltip } from 'components/user/UserAvatar'
import { Party } from 'type/party'

const PartyDetailModal: FC = () => {
  const router = useRouter()
  const closeModal = () => router.push('/party')
  const { id } = router.query

  const { data, error, isLoading } = useQuery(
    ['partyItem', id],
    () => retrieveParty<Party>(id),
    { enabled: !!id },
  )
  if (data)
    return (
      <div>
        <WhiteRoundedCard>
          <div className="mb-1 flex items-center">
            <span className="mr-2 rounded border border-blue-500 p-1 text-xs text-blue-500">
              {data.keyword.category?.name}
            </span>
            <p className="text-lg font-bold">{data.name}</p>
          </div>

          <span className="text-blue-500">#{data.keyword.name}</span>

          <div className="my-4 flex -space-x-1 border border-white border-y-gray-200 py-3">
            {data.membership.map((membership) => (
              <UserAvatarTooltip
                user={membership.team_member}
                key={membership.id}
              />
            ))}
          </div>
        </WhiteRoundedCard>
      </div>
    )
  return <></>
}

export default PartyDetailModal
