import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import rootReducer from './modules'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeConfiguredStore = (reducer: any) => {
  return configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
}
const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore(rootReducer)
  } else {
    const persistConfig = {
      key: 'root',
      storage,
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = makeConfiguredStore(persistedReducer)
    return store
  }
}

export const wrapper = createWrapper(makeStore)
