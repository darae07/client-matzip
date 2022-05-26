import { combineReducers } from '@reduxjs/toolkit'
import token from './auth/token'
import user from './auth/user'
import toast from './ui/toast'

const rootReducer = combineReducers({
  token,
  user,
  toast,
})

export { rootReducer }
export * from './auth'
export * from './ui'