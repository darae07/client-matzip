import React from 'react'
import {
  useForm,
  UseFormProps,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form'

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
  const methods = useForm<TFomValues>(options)
  return (
    <FormProvider<TFomValues> {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {React.Children.map(children, (child) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name,
                  errors: methods.formState.errors,
                },
              })
            : child
        })}
      </form>
    </FormProvider>
  )
}
