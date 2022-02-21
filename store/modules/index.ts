import { combineReducers } from '@reduxjs/toolkit'
import token from './auth/token'
import user from './auth/user'

const rootReducer = combineReducers({
  token,
  user,
})

export default rootReducer
