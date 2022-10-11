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
import Head from 'next/head'

declare global {
  interface Window {
    kakao: any
    Kakao: any
  }
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const store = useStore()
  const persistor = persistStore(store)
  const router = useRouter()

  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY

  injectStore(store)
  useEffect(() => {
    setupAxiosInterceptors(store, router)
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY)
      console.log(window.Kakao)
    }
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
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
              <Head>
                <link rel="shortcut icon" href="/favicon.png" />
              </Head>
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
            <ReactQueryDevtools />
          </Hydrate>
        </QueryClientProvider>
      </PersistGate>
    </>
  )
}

export default wrapper.withRedux(App)
