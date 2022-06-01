import _ from 'lodash'
import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
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

export type FormTextareaProps<TFormValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<
  Omit<
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    'name'
  >,
  'ref'
>

export const FormTextarea = <TFormValues extends Record<string, any>>({
  className,
  name,
  register,
  rules,
  errors,
  ...props
}: FormTextareaProps<TFormValues>): JSX.Element => {
  const errorMessages = _.get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div className={classNames(className, 'h-fit')}>
      <textarea
        name={name}
        aria-invalid={hasError}
        className={classNames(
          'block h-36 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          {
            'input-error': hasError,
          },
        )}
        {...props}
        {...(register && register(name, rules))}
      ></textarea>
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
