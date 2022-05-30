import _ from 'lodash'
import React from 'react'
import { InputProps } from '@/components'
import { FormErrorMessage } from './FormErrorMessage'
import { Input } from '../Input'
import {
  UseFormRegister,
  Path,
  RegisterOptions,
  DeepMap,
  FieldError,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<Omit<InputProps, 'name'>, 'ref'>

export const FormInput = <TFomValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  errors,
  ...props
}: FormInputProps<TFomValues>): JSX.Element => {
  const errorMessages = _.get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div className={className} aria-live="polite">
      <Input
        name={name}
        aria-invalid={hasError}
        className={classNames({
          'border-red-600 transition-colors hover:border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50':
            hasError,
        })}
        {...props}
        {...(register && register(name, rules))}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  )
}
