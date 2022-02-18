import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TokenState {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: TokenState = {
  accessToken: null,
  refreshToken: null,
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
    removeAccessToken: (state) => {
      state.accessToken = null
    },
    removeRefreshToken: (state) => {
      state.refreshToken = null
    },
  },
})

export const {
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} = tokenSlice.actions
export default tokenSlice.reducer
