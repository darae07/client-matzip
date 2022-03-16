import { listCategory } from 'api/keyword/category'
import { useQuery } from 'react-query'
import { PaginatedResult } from 'type/api'
import { Category } from 'type/lunch'

type SearchCategoryProps = {
  setCategory: Function
  category: number | null
}

const SearchCategory = ({ category, setCategory }: SearchCategoryProps) => {
  const { data } = useQuery<PaginatedResult<Category>>(
    ['category'],
    listCategory,
  )
  if (data)
    return (
      <div className="gird grid-cols-4 sm:grid-cols-7">
        {data.results.map((cat) => (
          <button
            key={cat.id}
            className={`${
              category === cat.id ? 'bg-blue-300 text-white' : 'text-blue-500'
            } mr-1 mb-2 rounded border border-blue-300 p-2 text-sm font-medium sm:mb-0`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    )
  return <></>
}

export { SearchCategory }
