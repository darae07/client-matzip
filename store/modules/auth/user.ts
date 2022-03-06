import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeamMember, User } from 'type/user'

interface UserState {
  isLoading: boolean
  user: User | null
  errorMessage: string | null
}
const initialState: UserState = {
  isLoading: false,
  user: null,
  errorMessage: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginStart: (state) => {
      state.isLoading = true
    },
    userLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.errorMessage = null
      state.isLoading = false
    },
    userLogout: (state) => {
      state.user = null
      state.errorMessage = null
      state.isLoading = false
    },
    catchError: (state, action: PayloadAction<string>) => {
      state.user = null
      state.errorMessage = action.payload
      state.isLoading = false
    },
    setUserTeamProfile: (state, action: PayloadAction<TeamMember>) => {
      if (state.user) {
        state.user.team_profile = action.payload
      }
    },
  },
})

export const {
  userLogin,
  userLogout,
  catchError,
  userLoginStart,
  setUserTeamProfile,
} = userSlice.actions
export default userSlice.reducer
