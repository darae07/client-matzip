import { retrieveParty } from '@/api'
import { Party } from '@/type'
import { useQuery } from 'react-query'

export const usePartyItemQuery = (id?: string | string[]) =>
  useQuery(['partyItem', id], () => retrieveParty<Party>(id), { enabled: !!id })
