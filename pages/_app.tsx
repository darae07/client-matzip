import '../styles/globals.css'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store'
import { persistStore } from 'redux-persist'
import { injectStore, setupAxiosInterceptors } from 'api'
import { AppPropsWithLayout } from 'type/ui'
import { ReactNode, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
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
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            mutations: {
              // useErrorBoundary: true,
            },
            queries: {
              cacheTime: 1000 * 60 * 60 * 2, // 2 hours
            },
          },
        }),
    )

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
            <Hydrate state={pageProps.dehydratedState}>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {}}
              >
                {getLayout(<Component {...pageProps} />)}
              </ErrorBoundary>
              <ReactQueryDevtools />
            </Hydrate>
          </QueryClientProvider>
        </PersistGate>
      </>
    )
  },
)
