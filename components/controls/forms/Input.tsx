import React, { FC } from 'react'
import { FieldProps } from 'formik'

interface InputProps {
  type?: string
  label: string
  withFeedbackLabel: boolean
}

const getClasses = (touched: boolean, errors: boolean) => {
  const classes = [
    `block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`,
  ]
  if (touched && errors) {
    classes.push('border-red-500')
  }
  if (touched && !errors) {
    classes.push('border-green-500')
  }
  return classes.join(' ')
}

export const Input: FC<InputProps & FieldProps> = ({
  field,
  form: { touched, errors },
  label,
  withFeedbackLabel = true,
  type = 'text',
  ...props
}) => {
  const isTouched = !!touched[field.name]
  const fieldError = errors[field.name]

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        className={getClasses(isTouched, !!fieldError)}
        {...field}
        {...props}
      />
      {withFeedbackLabel && isTouched && fieldError && (
        <div className="mt-1 text-xs text-red-500">{fieldError}</div>
      )}
    </div>
  )
}