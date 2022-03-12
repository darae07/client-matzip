import { ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType
  resetErrorBoundary: any
}

type RenderFallbackType = <ErrorType extends Error>(
  props: RenderFallbackProps<ErrorType>,
) => ReactNode

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
