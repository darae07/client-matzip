import _ from 'lodash'
import React, { useEffect } from 'react'
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
  autoSubmit?: boolean
  className?: string
}
export const Form = <TFomValues extends Record<string, unknown>>({
  options,
  onSubmit,
  children,
  autoSubmit = false,
  className,
}: FormProps<TFomValues>) => {
  const methods = useForm<TFomValues>(options)
  const handleAutoSubmit = _.debounce(onSubmit, 250, {
    maxWait: 500,
  })
  const values = methods.watch()

  useEffect(() => {
    if (autoSubmit) {
      handleAutoSubmit(values)
    }
  }, [values, autoSubmit, handleAutoSubmit])

  return (
    <FormProvider<TFomValues> {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className || ''}
      >
        {React.Children.map(children, (child) => {
          return child?.props.name
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
