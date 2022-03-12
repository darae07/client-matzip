import { listParty } from 'api/party'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Party } from 'type/party'
import PartyItem from './PartyItem'

const PartyItemList: FC = () => {
  const { data, error, isLoading } = useQuery(['party'], listParty)

  return (
    <div>
      {data.results?.map((party: Party) => (
        <PartyItem party={party} />
      ))}
    </div>
  )
}

export default PartyItemList
