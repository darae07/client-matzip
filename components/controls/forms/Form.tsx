import React from 'react'
import { useForm, UseFormProps, SubmitHandler } from 'react-hook-form'

type FormProps<TFomValues> = {
  options?: UseFormProps<TFomValues>
  onSubmit: SubmitHandler<TFomValues>
  children: any
}
export const Form = <TFomValues extends Record<string, unknown>>({
  options,
  onSubmit,
  children,
}: FormProps<TFomValues>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFomValues>(options)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register,
                key: child.props.name,
                errors: errors,
              },
            })
          : child
      })}
    </form>
  )
}
