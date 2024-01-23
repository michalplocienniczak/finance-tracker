import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types'
import { getUserAction, loginAction } from './actions'

type InitialState = {
  activeUser: User | null
  isActiveUserLoading: boolean
}

const initialState: InitialState = {
  activeUser: null,
  isActiveUserLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.isActiveUserLoading = true
    })
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.activeUser = action.payload
    })
    builder.addCase(loginAction.rejected, (state) => {
      state.isActiveUserLoading = false
    })
    builder.addCase(getUserAction.pending, (state) => {
      state.isActiveUserLoading = true
    })
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.activeUser = action.payload
    })
    builder.addCase(getUserAction.rejected, (state) => {
      state.isActiveUserLoading = false
    })
  },
})
