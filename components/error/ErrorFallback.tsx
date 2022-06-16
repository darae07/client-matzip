import { ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { RefreshIcon } from '@heroicons/react/outline'

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType
  resetErrorBoundary: any
}

type RenderFallbackType = <ErrorType extends Error>(
  props: RenderFallbackProps<ErrorType>,
) => ReactNode

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="container mx-auto flex h-screen w-fit items-center"
    >
      <div className="text-center">
        <h1 className="text-5xl font-black text-blue-400">
          문제가 발생했습니다.
        </h1>
        <pre className="mt-5 text-2xl">{error.message}</pre>
        <button onClick={resetErrorBoundary}>
          <RefreshIcon className="mt-5 h-10 w-10" />
        </button>
      </div>
    </div>
  )
}
