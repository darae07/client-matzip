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
import Script from 'next/script'

declare global {
  interface Window {
    kakao: any
  }
}

export default wrapper.withRedux(
  ({ Component, pageProps }: AppPropsWithLayout) => {
    const store = useStore()
    const persistor = persistStore(store)
    const router = useRouter()

    injectStore(store)
    useEffect(() => {
      setupAxiosInterceptors(store, router)
    }, [])

    const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          // useErrorBoundary: true,
        },
      },
      queryCache: new QueryCache({}),
    })

    const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY

    return (
      <>
        <Script
          id="kakao-sdk"
          type="text/javascript"
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`}
        />
        <PersistGate persistor={persistor} loading={null}>
          <QueryClientProvider client={queryClient}>
            <Toast />
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </PersistGate>
      </>
    )
  },
)
