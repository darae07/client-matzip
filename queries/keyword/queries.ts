import { retrieveKeyword } from '@/api/keyword/read'
import { ApiErrorResponse } from '@/type/api'
import { Keyword } from '@/type/lunch'
import { useAppSelector } from '@/utils/hooks'
import { useQuery } from 'react-query'

export const useKeywordItemQuery = (id?: string | string[]) => {
  const { user } = useAppSelector((state) => state.user)
  useQuery<void | Keyword, ApiErrorResponse<Keyword>>(
    ['keywordItem', id],
    ({ pageParam = 1 }) => retrieveKeyword(pageParam),
    {
      enabled: !!user?.team_profile,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 60,
    },
  )
}
