import { FC } from 'react'
import { WhiteRoundedCard } from 'components/card/styledCard'
import { PlusIcon } from '@heroicons/react/outline'

const CategoryFilter: FC = () => {
  return (
    <WhiteRoundedCard>
      <div className="flex">
        <div className="w-3/4 border-r"> filter</div>
        <div className="flex w-1/4 justify-between px-4">
          <button className="">내파티 보기</button>
          <button className="rounded-full bg-blue-500 p-1">
            <PlusIcon className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </WhiteRoundedCard>
  )
}

export default CategoryFilter
