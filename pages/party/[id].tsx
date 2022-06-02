import _ from 'lodash'
import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'
import {
  WhiteRoundedCard,
  HomeLayout,
  UserAvatarTooltip,
  openToast,
} from '@/components'
import { CategoryName, KakaoMap, ReviewModal } from '@/components/modules'
import {
  NextPageWithLayout,
  ApiResponseData,
  Party,
  Team,
  PartyMembership,
} from '@/type'
import { useAppSelector, useMutationHandleError } from '@/utils/hooks'
import { joinParty, outParty, retrieveParty, retrieveTeam } from '@/api'
import { calculatePercent } from '@/utils'

const PartyDetail: NextPageWithLayout = () => {
  const { query } = useRouter()
  const { id } = query
  const queryClient = useQueryClient()

  const { data, error, isLoading } = useQuery(
    ['partyItem', id],
    () => retrieveParty<Party>(id),
    { enabled: !!id },
  )

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const myTeam = useQuery(
    ['myTeam', teamId],
    () => retrieveTeam<Team>(teamId),
    {
      enabled: !!teamId,
      staleTime: 1000 * 60 * 60,
    },
  )

  const [myMembership, setMyMembership] = useState<PartyMembership>()
  useEffect(() => {
    if (data && data?.membership) {
      const my_membership = _.find(data.membership, function (e) {
        return e.team_member.id === team_profile?.id
      })
      setMyMembership(my_membership)
    }
  }, [data, team_profile])

  const joinMutation = useMutationHandleError(
    joinParty,
    {
      onSuccess: (response: ApiResponseData<PartyMembership>) => {
        const { message, result } = response
        openToast(message || '참여 완료')
        setMyMembership(result)
        const membership = data ? data.membership : []
        const updatedParty = { ...data, membership: [...membership, result] }
        queryClient.setQueryData(['partyItem', id], updatedParty)
        queryClient.setQueriesData(['party', { id: id }], updatedParty)
      },
    },
    '참여할 수 없습니다.',
  )

  const handleJoinParty = () => {
    const data = { party: Number(id) }
    joinMutation.mutate(data)
  }

  const outMutation = useMutationHandleError(
    outParty,
    {
      onSuccess: (response: ApiResponseData<any>) => {
        const { message, result } = response
        openToast(message || '나가기 완료')
        const membership = data ? data.membership : []
        const updatedParty = {
          ...data,
          membership: _.filter(membership, (e) => {
            return e.team_member.id !== team_profile?.id
          }),
        }
        setMyMembership(undefined)
        queryClient.setQueryData(['partyItem', id], updatedParty)
        queryClient.setQueriesData(['party', { id: id }], updatedParty)
      },
    },
    '에러가 발생했습니다.',
  )

  const handleOutParty = () => {
    outMutation.mutate(myMembership?.id)
  }

  const [isReviewModalOpen, setReviewModalOpen] = useState(false)
  const openReviewModal = () => setReviewModalOpen(true)

  if (data)
    return (
      <div>
        <WhiteRoundedCard className="mb-4">
          <div className="mb-1 flex items-center">
            <CategoryName category={data.keyword.category} className="mr-2" />
            <p className="text-lg font-bold">{data.name}</p>
          </div>

          <span className="text-blue-500">#{data.keyword.name}</span>
          <div className="mt-1 text-sm">
            <p>맛집 인기도</p>
            <p>오늘의 메뉴에 등록된 횟수: {data.keyword.hit_count}</p>
            <p>동료들이 식사한 횟수: {data.keyword.eat_count}</p>
            <p>
              맛있다 비율:
              {calculatePercent(
                data.keyword.good_count,
                data.keyword.eat_count,
              )}
              %
            </p>
          </div>

          <div className="mt-4 text-sm">{data.description}</div>

          <div className="my-4 flex justify-between border border-white border-y-gray-200 py-3">
            <div className="flex -space-x-1">
              {data.membership.map((membership) => (
                <UserAvatarTooltip
                  user={membership.team_member}
                  key={membership.id}
                />
              ))}
            </div>
            <div>
              {!!myMembership ? (
                <div>
                  <button
                    onClick={() => handleOutParty()}
                    className="rounded bg-blue-600 p-2 px-3 text-sm text-white"
                  >
                    나가기
                  </button>
                  <ReviewModal
                    isOpen={isReviewModalOpen}
                    setOpen={setReviewModalOpen}
                    domain="party"
                  />
                  <button
                    onClick={openReviewModal}
                    className="ml-2 rounded bg-pink-500 p-2 px-3 text-sm text-white"
                  >
                    먹었어요
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleJoinParty()}
                  className="rounded bg-blue-600 p-2 px-3 text-sm text-white"
                >
                  같이갈래요
                </button>
              )}
            </div>
          </div>
        </WhiteRoundedCard>

        {myTeam.data && (
          <WhiteRoundedCard className="h-72">
            <KakaoMap
              location={myTeam.data.location}
              keyword={data.keyword.name}
            />
          </WhiteRoundedCard>
        )}
      </div>
    )
  return <></>
}

export default PartyDetail

PartyDetail.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
