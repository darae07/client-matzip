import styled from 'styled-components'
import tw from 'twin.macro'

export const WhiteRoundedCard = styled.div<{ flatTop?: boolean }>`
  ${tw` bg-white py-6 px-7 text-gray-800 shadow`}
  ${(props) => (props.flatTop ? tw`rounded-b-lg` : tw`rounded-lg`)}
`
