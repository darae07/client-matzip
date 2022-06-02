import React from 'react'
import { LiHTMLAttributes } from 'react'
import { WhiteRoundedCard } from '@/components'
import classNames from 'classnames'

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  isPreviousData?: boolean
}

export const ListItem = ({ children, isPreviousData, ...props }: Props) => (
  <li {...props} className={classNames({ 'opacity-50': isPreviousData })}>
    <WhiteRoundedCard className="h-full">{children}</WhiteRoundedCard>
  </li>
)
