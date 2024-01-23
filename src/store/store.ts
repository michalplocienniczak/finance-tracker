import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authSlice } from './Auth'
import { expensesSlice } from './Expenses'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expenses: expensesSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
