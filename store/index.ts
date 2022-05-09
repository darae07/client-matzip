import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './modules'
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

const persistConfig = {
  key: 'root',
  storage,
}
const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

const makeStore = () => {
  return store
}

export const wrapper = createWrapper(makeStore)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
