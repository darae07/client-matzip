import React from 'react'
import { LiHTMLAttributes } from 'react'
import { WhiteRoundedCard } from '@/components'

interface Props extends LiHTMLAttributes<HTMLLIElement> {}

export const ListItem = ({ children, ...props }: Props) => (
  <li {...props}>
    <WhiteRoundedCard className="h-full">{children}</WhiteRoundedCard>
  </li>
)
