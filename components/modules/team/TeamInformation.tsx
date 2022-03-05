import { retrieveTeam } from 'api/team'
import { useAppSelector } from 'hooks'
import { FC, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

const TeamInformation: FC = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  useEffect(() => {})
  const myTeam = useQuery(['myTeam', teamId], () => retrieveTeam(teamId), {
    enabled: !!teamId,
  })
  return <div></div>
}

export { TeamInformation }
