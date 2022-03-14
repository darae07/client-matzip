import { listMyParty } from 'api/party'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Party } from 'type/party'
import PartyItem from './PartyItem'

const MyPartyItemList: FC = () => {
  const { data, error, isLoading } = useQuery<Party[]>(['myParty'], listMyParty)

  return (
    <div className="grid grid-cols-1 gap-4">
      {data?.map((party: Party) => (
        <PartyItem party={party} key={party.id} />
      ))}
    </div>
  )
}

export default MyPartyItemList
