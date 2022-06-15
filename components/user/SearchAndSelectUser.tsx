import { Fragment, HTMLAttributes, useState } from 'react'
import { Form, FormInput, ListItem, InfiniteScroll } from '@/components'
import { UnpackNestedValue } from 'react-hook-form'
import { useInfiniteQuery, UseMutationResult } from 'react-query'
import { PaginatedResult, TeamMember } from '@/type'
import { searchTeamMember } from '@/api'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserAvatar } from './UserAvatar'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectAction: Function
  party?: number
  mutatonState?: UseMutationResult
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
  mutatonState,
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

  const handleSelectUser = (id: number) => selectAction(id)

  return (
    <div>
      <p className="mb-4 text-2xl font-bold text-black">멤버 초대하기</p>
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

      {data && (
        <div className="mt-2">
          <ul className="h-80 overflow-y-auto">
            {data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.results.map((item: TeamMember) => (
                  <ListItem key={item.id}>
                    <div
                      onClick={() => handleSelectUser(item.id)}
                      className={classNames(
                        'py-4 px-2 hover:cursor-pointer hover:bg-gray-100',
                        {
                          'animate-pulse bg-gray-50': mutatonState?.isLoading,
                        },
                      )}
                    >
                      <div className="flex items-center">
                        <UserAvatar user={item} />
                        <span className="text-md ml-2 font-medium text-black">
                          {item.member_name}
                        </span>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </Fragment>
            ))}
          </ul>
          <InfiniteScroll
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      )}
    </div>
  )
}
