import { Keyword } from '@/type/lunch'
import classNames from 'classnames'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  keyword: Keyword
}
export const KeywordName = ({ keyword, className }: Props) => {
  if (!keyword) return <></>
  return (
    <span className={classNames('font-bold text-blue-500', className)}>
      {keyword?.name}
    </span>
  )
}
