import { retrieveKeyword } from '@/api/keyword/read'
import { ApiErrorResponse } from '@/type/api'
import { Keyword } from '@/type/lunch'
import { useQuery } from 'react-query'

export const useKeywordItemQuery = (id?: string | string[]) =>
  useQuery<void | Keyword, ApiErrorResponse<Keyword>>(
    ['keywordItem', id],
    () => retrieveKeyword(id),
    { enabled: !!id },
  )
