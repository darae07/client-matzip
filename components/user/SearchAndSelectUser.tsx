import _ from 'lodash'
import { Fragment, HTMLAttributes, useState } from 'react'
import { ListItem, InfiniteScroll, Input } from '@/components'
import { UseMutationResult } from 'react-query'
import { TeamMember } from '@/type'
import { UserAvatar } from './UserAvatar'
import classNames from 'classnames'
import { useSearchMemberQuery } from '@/queries'
import { LoadingSpinner } from '../skeletons'

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectAction: Function
  party?: number
  mutatonState?: UseMutationResult
}

export const SearchAndSelectUser = ({
  selectAction,
  party,
  mutatonState,
}: Props): JSX.Element => {
  const [search, setSearch] = useState<string>()
  const handleSetSearchKeyword = (e: any) => setSearch(e.target.value)
  const handleSearchField = _.debounce(handleSetSearchKeyword, 250, {
    maxWait: 500,
  })

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useSearchMemberQuery(search, party)

  const handleSelectUser = (id: number) => selectAction(id)

  return (
    <div className="h-fit">
      <p className="mb-4 text-2xl font-bold text-black">멤버 초대하기</p>

      <Input
        name="member_name"
        className={classNames({ 'animate-pulse': isLoading })}
        placeholder="멤버 찾기"
        onChange={handleSearchField}
      />

      {isLoading && (
        <div className="flex h-10 w-full items-center justify-center p-3">
          <LoadingSpinner />
        </div>
      )}

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
                          'animate-pulse bg-gray-50':
                            mutatonState?.isLoading || isLoading,
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
