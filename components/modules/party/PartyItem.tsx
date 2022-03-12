import { FC } from 'react'
import { Party } from 'type/party'
type PartyItemProps = {
  party: Party
}
const PartyItem: FC<PartyItemProps> = ({ party }) => {
  return <div>{party.name}</div>
}

export default PartyItem
