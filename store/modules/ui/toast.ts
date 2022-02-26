import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToastState {
  isOpen: boolean
  message: string | null
  disappearTime: number
}

const initialState: ToastState = {
  isOpen: false,
  message: null,
  disappearTime: 3000,
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<string>) => {
      state.isOpen = true
      state.message = action.payload
    },
    closeToast: (state) => {
      state.isOpen = false
      state.message = null
    },
  },
})

export const { openToast, closeToast } = toastSlice.actions
export default toastSlice.reducer
