import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'type/user'

interface UserState {
  user: User | null
  errorMessage: string | null
}
const initialState: UserState = {
  user: null,
  errorMessage: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.errorMessage = null
    },
    userLogout: (state) => {
      state.user = null
      state.errorMessage = null
    },
    catchError: (state, action: PayloadAction<string>) => {
      state.user = null
      state.errorMessage = action.payload
    },
  },
})

export const { userLogin, userLogout, catchError } = userSlice.actions
export default userSlice.reducer
