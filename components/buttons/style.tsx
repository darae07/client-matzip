import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'red' | 'blue' | 'pink' | 'white'
  size?: 'small' | 'medium' | 'xsmall'
  disabled?: boolean
}
export const Button = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))<ButtonProps>`
  ${tw`hover:shadow rounded text-sm text-white font-bold uppercase outline-none transition-all duration-150 ease-linear focus:outline-none`}
  ${(props) => props.color === 'red' && tw`text-red-500`}
  ${(props) => props.color === 'blue' && tw`bg-blue-500 active:bg-blue-600`}
  ${(props) => props.color === 'pink' && tw`bg-pink-500 active:bg-pink-600`}
  ${(props) =>
    props.color === 'white' &&
    tw`bg-white border border-gray-400 active:bg-gray-200 text-gray-600`}
  ${(props) =>
    props.size === 'small'
      ? tw`p-2 px-3`
      : props.size === 'xsmall'
      ? tw`px-1 py-1 font-semibold`
      : tw`px-4 py-2`}
  ${(props) => props.disabled && tw`bg-gray-500`}
`
export const SamllLikeButton = styled.button`
  ${tw`max-h-10 rounded-lg border border-blue-200 p-1.5 text-blue-500`}
`

export const SmallBlueButton = styled.button`
  ${tw`max-h-10 rounded-lg bg-blue-500 p-1.5 text-white`}
`
