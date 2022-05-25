import React, { FC } from 'react'
import LoadingSpinnerIcon from '@/public/icon/loading_spinner.svg'

interface IconProps {
  width: number | string | null
  height: number | string | null
  className: string | null
}

export const LoadingSpinner: FC<IconProps> = ({
  width = 24,
  height = 16,
  className,
}) => {
  return (
    <LoadingSpinnerIcon
      width={width}
      height={height}
      className={`animate-spin ${className}`}
    />
  )
}
