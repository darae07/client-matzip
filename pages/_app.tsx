import '../styles/globals.css'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store'
import { persistStore } from 'redux-persist'
import { injectStore, setupAxiosInterceptors } from 'api'
import { Toast } from 'components/toast/toast'
import { AppPropsWithLayout } from 'type/ui'
import { ReactNode, useEffect } from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'components/error/ErrorFallback'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default wrapper.withRedux(
  ({ Component, pageProps }: AppPropsWithLayout) => {
    const store = useStore()
    const persistor = persistStore(store)
    const router = useRouter()

    injectStore(store)
    setupAxiosInterceptors(store, router)

    const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          // useErrorBoundary: true,
        },
      },
      queryCache: new QueryCache({
        onError: (error: any) => toast.error(error.message),
      }),
    })

    return (
      <>
        <PersistGate persistor={persistor} loading={null}>
          <QueryClientProvider client={queryClient}>
            <Toast />
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </PersistGate>
      </>
    )
  },
)
