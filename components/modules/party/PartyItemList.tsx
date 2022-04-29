import { ListItem } from '@/components/listItem'
import { UserAvatarTooltip } from '@/components/user/UserAvatar'
import { listParty } from 'api/party'
import Link from 'next/link'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { PaginatedResult } from 'type/api'
import { Party } from 'type/party'

const PartyItemList: FC = () => {
  const { data, error, isLoading } = useQuery<PaginatedResult<Party>>(
    ['party'],
    listParty,
  )

  return (
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
          </ListItem>
        </Link>
      ))}
    </ul>
  )
}

export default PartyItemList
