import { combineReducers } from '@reduxjs/toolkit'
import token from './auth/token'

const rootReducer = () => {
  return combineReducers({
    token,
  })
}

export default rootReducer
