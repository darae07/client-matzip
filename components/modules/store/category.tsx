import styled from 'styled-components'
import tw from 'twin.macro'
import { Category as CategoryType } from 'type/lunch'

type CategoryProps = {
  category?: CategoryType
  className?: string
}
export const CategoryName = ({ category, ...props }: CategoryProps) => {
  return <BlueBox className={props.className}>{category?.name}</BlueBox>
}

const BlueBox = styled.span<{ className?: string }>`
  ${tw`rounded border border-blue-500 p-1 text-xs text-blue-500`}
`
