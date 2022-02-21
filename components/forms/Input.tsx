import React, { FC } from 'react'
import { FieldProps } from 'formik'

interface InputProps {
  type?: string
  label: string
  withFeedbackLabel: boolean
}

const getClasses = (touched: boolean, errors: boolean) => {
  const classes = []
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
      {withFeedbackLabel && isTouched && fieldError && <div>{fieldError}</div>}
    </div>
  )
}
