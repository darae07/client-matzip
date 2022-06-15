import { retrieveTeam } from '@/api'
import { Team } from '@/type'
import { useQuery } from 'react-query'

export const useMyTeamQuery = (teamId?: number) =>
  useQuery(['myTeam', teamId], () => retrieveTeam<Team>(teamId), {
    enabled: !!teamId,
    staleTime: 1000 * 60 * 60,
  })
