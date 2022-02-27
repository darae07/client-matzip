import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, ReactReduxContext, useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store'
import App from 'next/app'
import { persistStore } from 'redux-persist'
import { injectStore } from 'api'
import { Toast } from 'components/toast/toast'
import Script from 'next/script'
import { useEffect } from 'react'

export default wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  const store = useStore()
  const persistor = persistStore(store)
  injectStore(store)

  return (
    <>
      <PersistGate persistor={persistor} loading={null}>
        <Toast />
        <Component {...pageProps} />
      </PersistGate>
    </>
  )
})
