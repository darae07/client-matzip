import { WhiteRoundedCard } from 'components/card/styledCard'
import { UserAvatar, UserAvatarTooltip } from 'components/user/UserAvatar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Party } from 'type/party'

type PartyItemProps = {
  party: Party
}
const PartyItem: FC<PartyItemProps> = ({ party }) => {
  return (
    <Link
      href={`/party?id=${party.id}`}
      as={`/party/${party.id}`}
      scroll={false}
      passHref
    >
      <WhiteRoundedCard>
        <div className="mb-1 flex items-center">
          <span className="mr-2 rounded border border-blue-500 p-1 text-xs text-blue-500">
            {party.keyword.category?.name}
          </span>
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
      </WhiteRoundedCard>
    </Link>
  )
}

export default PartyItem
