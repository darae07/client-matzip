import { HTMLAttributes, useState } from 'react'
import { Form, FormInput } from '@/components'
import { UnpackNestedValue } from 'react-hook-form'
import { useInfiniteQuery } from 'react-query'
import { PaginatedResult, TeamMember } from '@/type'
import { searchTeamMember } from '@/api'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectAction: Function
  party?: number
}

type SearchUserValues = {
  member_name: string
}

const searchUserValues: SearchUserValues = {
  member_name: '',
}

export const SearchAndSelectUser = ({
  selectAction,
  party,
}: Props): JSX.Element => {
  const [search, setSearch] = useState<string>()
  const handleSetSearchKeyword = (data: UnpackNestedValue<SearchUserValues>) =>
    setSearch(data.member_name)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery<PaginatedResult<TeamMember>>(
    ['member', search, party],
    ({ pageParam = 1 }) => searchTeamMember(pageParam, search, party),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.next,
      cacheTime: 1000 * 60 * 60,
    },
  )

  const searchUserFormSchema = Yup.object().shape({
    member_name: Yup.string(),
  })

  return (
    <div>
      <Form<SearchUserValues>
        onSubmit={handleSetSearchKeyword}
        options={{
          resolver: yupResolver(searchUserFormSchema),
          defaultValues: searchUserValues,
          mode: 'all',
        }}
        autoSubmit={true}
      >
        <FormInput<SearchUserValues>
          name="member_name"
          placeholder="멤버 찾기"
        />
      </Form>
    </div>
  )
}
