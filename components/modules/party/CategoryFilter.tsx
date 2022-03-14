import React, { FC, useState } from 'react'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { SearchCategory } from './SearchCategory'

const CategoryFilter: FC = () => {
  const router = useRouter()
  const createParty = () => {
    router.push('/party/create')
  }

  const [category, setCategory] = useState(null)

  return (
    <WhiteRoundedCard>
      <div className="flex">
        <div className="w-3/4 border-r pr-4">
          <SearchCategory setCategory={setCategory} category={category} />
        </div>
        <div className="flex w-1/4 justify-between px-4">
          <button className="">내파티 보기</button>
          <button
            onClick={createParty}
            className="rounded-full bg-blue-500 p-1"
          >
            <PlusIcon className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </WhiteRoundedCard>
  )
}

export default CategoryFilter
