import { useQuery } from 'react-query'
import { listCategory } from '@/api'
import { PaginatedResult, Category } from '@/type'

type SearchCategoryProps = {
  setCategory: Function
  category?: number
}

const SearchCategory = ({ category, setCategory }: SearchCategoryProps) => {
  const { data } = useQuery<PaginatedResult<Category>>(
    ['category'],
    listCategory,
    { staleTime: Infinity },
  )

  const handelSelectCategory = (id: number) => {
    if (id === category) setCategory(undefined)
    else {
      setCategory(id)
    }
  }
  if (data)
    return (
      <div className="gird grid-cols-4 sm:grid-cols-7">
        {data.results.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`${
              category === cat.id ? 'bg-blue-300 text-white' : 'text-blue-500'
            } mr-1 mb-2 rounded border border-blue-300 p-2 text-sm font-medium sm:mb-0`}
            onClick={() => handelSelectCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    )
  return <></>
}

export { SearchCategory }
