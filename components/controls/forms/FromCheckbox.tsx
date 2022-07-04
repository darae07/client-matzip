import _ from 'lodash'
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { FormErrorMessage } from './FormErrorMessage'
import {
  UseFormRegister,
  Path,
  RegisterOptions,
  DeepMap,
  FieldError,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'

type FormInputProps<TFormValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  hasWhiteSpace?: boolean
  label?: string
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>

export const FormCheckbox = <TFormValues extends Record<string, any>>({
  className,
  name,
  register,
  rules,
  errors,
  label,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = _.get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div className={classNames(className, 'flex items-center')}>
      {label && (
        <label className="text-sm text-gray-800">
          <input
            type="checkbox"
            name={name}
            aria-invalid={hasError}
            {...props}
            {...(register && register(name, rules))}
          />
          <span className="ml-1">{label}</span>
        </label>
      )}
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
