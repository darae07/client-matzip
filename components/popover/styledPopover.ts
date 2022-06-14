import styled from 'styled-components'
import tw from 'twin.macro'

export const PopoverContainer = styled.div`
  ${tw`overflow-hidden h-screen sm:h-full rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`}
`
export const PopoverItem = styled.a`
  ${tw` flex items-center text-gray-600 rounded-lg p-3 pr-7 sm:pr-3 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none `}
`
