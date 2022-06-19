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
  useFormContext,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
} & Omit<Omit<InputProps, 'name'>, 'ref'>

export const FormInput = <TFomValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  errors,
  onChange,
  ...props
}: FormInputProps<TFomValues>): JSX.Element => {
  const errorMessages = _.get(errors, name)
  const hasError = !!(errors && errorMessages)
  const { setValue } = useFormContext()
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimedValue = (onChange ? onChange(e) : e.currentTarget.value).trim()
    setValue(name, trimedValue)
  }

  return (
    <div className={className} aria-live="polite">
      <Input
        name={name}
        aria-invalid={hasError}
        className={classNames({
          'input-error': hasError,
        })}
        {...props}
        {...(register && register(name, rules))}
        onChange={handleOnChange}
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
