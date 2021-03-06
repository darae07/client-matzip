import { ReactElement } from 'react'
import { NextPageWithLayout } from '@/type/ui'
import Link from 'next/link'
import { WhiteRoundedCard, HomeLayout } from '@/components'
import {
  TeamInformation,
  FindTeamModal,
  CreateTeamModal,
} from '@/components/modules'
import { useAppSelector } from '@/utils/hooks'

const TeamPage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile

  return (
    <div>
      {!team_profile && (
        <>
          <Link href="/team" as="/team/find" passHref>
            <WhiteRoundedCard className="mb-4 cursor-pointer">
              <span className="mr-2 text-3xl">π€</span> λλ£μκ² μμ₯ μ½λλ₯Ό
              κ³΅μ λ°μΌμ¨λμ? μμ₯ μ½λλ‘ νμ¬μ ν©λ₯ν΄ λ³΄μΈμ
            </WhiteRoundedCard>
          </Link>

          <Link href="/team" as="/team/create" passHref>
            <WhiteRoundedCard className="mb-4 cursor-pointer">
              <span className="mr-2 text-3xl">π </span>μλΉμ€κ° μ²μμ΄μ κ°μ?
              νμ¬λ₯Ό λ±λ‘νκ³  λλ£μ μ΄λν΄μ ν¨κ» μ μ¬μ μ¦κΈ°μΈμ
            </WhiteRoundedCard>
          </Link>
        </>
      )}
      {!!team_profile && (
        <>
          <WhiteRoundedCard className="mb-4">
            <span className="mr-2 text-3xl">π€</span> λλ£μκ² μμ₯ μ½λλ₯Ό
            κ³΅μ ν΄ λ³΄μΈμ
          </WhiteRoundedCard>
          <div className="mb-4">
            <TeamInformation />
          </div>
          <WhiteRoundedCard className="mb-4">
            μ°λ¦¬ νμ¬ μ£Όλ³ λ§μ§
          </WhiteRoundedCard>
        </>
      )}

      <CreateTeamModal />
      <FindTeamModal />
    </div>
  )
}

export default TeamPage

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
