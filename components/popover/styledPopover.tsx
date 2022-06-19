import classNames from 'classnames'
import { useRouter } from 'next/router'
import { forwardRef, LiHTMLAttributes } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const PopoverContainer = styled.ul`
  ${tw`overflow-hidden h-[95vh] sm:h-full rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`}
`

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  href?: string
}

export const PopoverItem = ({ children, href }: Props) => {
  const router = useRouter()
  const handlePush = () => href && router.push(href)
  return (
    <li
      onClick={handlePush}
      className={classNames(
        'flex items-center rounded-lg p-3 pr-7 text-gray-600 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none sm:pr-3',
        {
          'cursor-pointer': !!href,
        },
      )}
    >
      {children}
    </li>
  )
}
