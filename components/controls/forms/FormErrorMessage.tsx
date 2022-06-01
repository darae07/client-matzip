import React, { FC } from 'react'
import classNames from 'classnames'

interface FormErrorMessageProps {
  className?: string
}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => {
  return (
    <p
      className={classNames('block text-left text-sm text-red-600', className)}
    >
      {children}
    </p>
  )
}
