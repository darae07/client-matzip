import { combineReducers } from '@reduxjs/toolkit'
import token from './auth/token'

const rootReducer = combineReducers({
  token,
})

export default rootReducer
