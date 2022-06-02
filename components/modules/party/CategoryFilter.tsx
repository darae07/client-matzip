import React, { FC, HTMLAttributes, useState } from 'react'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { PlusIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { SearchCategory } from './SearchCategory'

const CategoryFilter: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const router = useRouter()
  const createParty = () => {
    router.push('/party/create')
  }

  const [category, setCategory] = useState()

  return (
    <WhiteRoundedCard className={props.className}>
      <div className="flex justify-between">
        <div className=" border-r pr-4">
          <SearchCategory setCategory={setCategory} category={category} />
        </div>
        <div className="flex justify-between ">
          <button className="my-auto ml-4 mr-2 max-h-10 rounded-lg border border-blue-200 p-1.5">
            <HeartIcon className="h-4 w-4 text-blue-500" />
          </button>
          <button
            onClick={createParty}
            className="my-auto max-h-10 rounded-lg bg-blue-500 p-1.5"
          >
            <PlusIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </WhiteRoundedCard>
  )
}

export { CategoryFilter }
