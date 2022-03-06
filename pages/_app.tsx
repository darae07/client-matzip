import '../styles/globals.css'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store'
import { persistStore } from 'redux-persist'
import { injectStore } from 'api'
import { Toast } from 'components/toast/toast'
import { AppPropsWithLayout } from 'type/ui'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export default wrapper.withRedux(
  ({ Component, pageProps }: AppPropsWithLayout) => {
    const store = useStore()
    const persistor = persistStore(store)
    injectStore(store)

    const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
    const queryClient = new QueryClient()

    return (
      <>
        <PersistGate persistor={persistor} loading={null}>
          <QueryClientProvider client={queryClient}>
            <Toast />
            {getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools />
          </QueryClientProvider>
        </PersistGate>
      </>
    )
  },
)
