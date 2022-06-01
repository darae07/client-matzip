import React, {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import classNames from 'classnames'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password'

export type InputProps = {
  id?: string
  name: string
  label?: string
  type?: InputType
  size?: InputSize
  className?: string
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>

const sizeMap: { [key in InputSize]: string } = {
  medium: 'p-3 text-base',
  large: 'p-4 text-base',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      size = 'medium',
      className = '',
      placeholder,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        id={id}
        name={name}
        ref={ref}
        type={type}
        aria-label={label}
        className={classNames([
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          sizeMap[size],
          className,
        ])}
        placeholder={placeholder}
        {...props}
      />
    )
  },
)

Input.displayName = 'input'
