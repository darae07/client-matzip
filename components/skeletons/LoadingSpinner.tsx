import React, { FC, HTMLAttributes } from 'react'
import LoadingSpinnerIcon from '@/public/icon/loading_spinner.svg'

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
}

export const LoadingSpinner: FC<IconProps> = ({
  width = 24,
  height = 16,
  className,
  role,
}) => {
  return (
    <LoadingSpinnerIcon
      width={width}
      height={height}
      className="animate-spin"
      role={role}
    />
  )
}
