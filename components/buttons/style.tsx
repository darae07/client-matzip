import styled from 'styled-components'
import tw from 'twin.macro'

interface ButtonProps {
  color?: 'red' | 'blue'
}
export const Button = styled.button<ButtonProps>`
  ${tw`mr-1 mb-1 px-4 py-2 text-sm font-bold uppercase  outline-none transition-all duration-150 ease-linear focus:outline-none`}
  ${(props) => props.color === 'red' && tw`text-red-500`}
${(props) =>
    props.color === 'blue' &&
    tw`bg-blue-500 text-white shadow hover:shadow-lg active:bg-blue-600`}
`
export const SamllLikeButton = styled.button`
  ${tw`max-h-10 rounded-lg border border-blue-200 p-1.5 text-blue-500`}
`

export const SmallBlueButton = styled.button`
  ${tw`max-h-10 rounded-lg bg-blue-500 p-1.5 text-white`}
`
