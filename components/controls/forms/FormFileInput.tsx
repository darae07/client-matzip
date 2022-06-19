import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  Fragment,
} from 'react'
import {
  UseFormRegister,
  Path,
  RegisterOptions,
  DeepMap,
  FieldError,
  useFormContext,
} from 'react-hook-form'
import Image from 'next/image'
import { useDropzone, Accept } from 'react-dropzone'
import { PhotographIcon } from '@heroicons/react/outline'

type FileInputProps = {
  id?: string
  name: string
  label?: string
  type?: 'file'
  className?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type FormFileInputProps<TFormValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  mode?: 'update' | 'append'
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  accept: Accept
} & Omit<Omit<Omit<FileInputProps, 'name'>, 'accept'>, 'ref'>

export const FormFileInput = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  type = 'file',
  mode = 'update',
  errors,
  accept,
  ...props
}: FormFileInputProps<TFormValues>): JSX.Element => {
  const { watch, setValue } = useFormContext()
  const files = watch(name)
  const defaultFile = typeof watch(name) === 'string' && watch(name)
  const updatedFile = Array.isArray(files) && files[0]

  const onDrop = useCallback(
    (droppedFiles) => {
      let newFiles =
        mode === 'update' ? droppedFiles : [...(files || []), ...droppedFiles]
      if (mode === 'append') {
        newFiles = newFiles.reduce((prev: [], file: File) => {
          const fo = Object.entries(file)
          const f = prev.find((e) => {
            const eo = Object.entries(e)
            return eo.every(
              ([key, value], index) =>
                key === fo[index][0] && value === fo[index][1],
            )
          })
          if (f) {
            return prev
          } else {
            return [...prev, file]
          }
        }, [])
      }
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, name, mode, files],
  )

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  })

  return (
    <div className={className}>
      {mode === 'append' && (
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
          {Array.isArray(files) && (
            <Fragment>
              {files.map((file: File) => (
                <div key={file.name} className="h-28 w-28 rounded-lg">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </Fragment>
          )}

          <label htmlFor={name} {...getRootProps()}>
            <div className="flex h-28 w-fit w-28 rounded-lg border bg-gray-100 hover:cursor-pointer">
              <PhotographIcon className="mx-auto my-auto h-8 w-8 " />
            </div>
          </label>
        </div>
      )}
      {mode === 'update' && (
        <div>
          <div className="relative h-28 w-28 rounded-lg ">
            <label htmlFor={name} {...getRootProps()}>
              <div className="absolute left-9 top-9 z-10 flex h-10 w-10 rounded-lg border bg-gray-100 hover:cursor-pointer">
                <PhotographIcon className="mx-auto my-auto h-8 w-8" />
              </div>
              <Image
                src={
                  defaultFile
                    ? defaultFile
                    : updatedFile
                    ? URL.createObjectURL(updatedFile)
                    : ''
                }
                alt={
                  defaultFile
                    ? defaultFile
                    : updatedFile
                    ? updatedFile.name
                    : ''
                }
                width={120}
                height={120}
                className="rounded-lg"
              />
            </label>
          </div>
        </div>
      )}

      <input
        id={name}
        type={type}
        name={name}
        className="hidden"
        {...props}
        {...(register && register(name, rules))}
        {...getInputProps()}
      />
    </div>
  )
}
