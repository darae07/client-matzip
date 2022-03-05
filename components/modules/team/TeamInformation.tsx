import { retrieveTeam } from 'api/team'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { useAppSelector } from 'hooks'
import { FC, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

const TeamInformation: FC = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  useEffect(() => {})
  const { data, error, isLoading } = useQuery(
    ['myTeam', teamId],
    () => retrieveTeam(teamId),
    {
      enabled: !!teamId,
    },
  )

  return (
    <WhiteRoundedCard>
      <div className="mb-2">회사 정보</div>
      <div className="font-bold">{data?.name}</div>
      <div>입장 코드: {data?.join_code}</div>
      <div>위치: {data?.location}</div>
    </WhiteRoundedCard>
  )
}

export { TeamInformation }
