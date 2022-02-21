import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, ReactReduxContext, useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store'
import App from 'next/app'
import { persistStore } from 'redux-persist'
import { injectStore } from 'api'

export default wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  const store = useStore()
  const persistor = persistStore(store)
  injectStore(store)
  return (
    <PersistGate persistor={persistor} loading={null}>
      <Component {...pageProps} />
    </PersistGate>
  )
})
