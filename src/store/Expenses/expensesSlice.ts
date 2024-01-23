import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Expense } from '../../types'
import {
  deleteExpenseAction,
  getExpensesByUserIdAction,
  patchExpenseAction,
  postExpenseAction,
} from './actions'
import { RootState } from '../store'

const expensesAdapter = createEntityAdapter<Expense>({
  selectId: ({ id }) => id,
})

type InitialState = {
  loading: boolean
}

const initialState: InitialState = {
  loading: false,
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: expensesAdapter.getInitialState<InitialState>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpensesByUserIdAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getExpensesByUserIdAction.fulfilled, (state, action) => {
      state.loading = false
      expensesAdapter.setAll(state, action.payload)
    })
    builder.addCase(getExpensesByUserIdAction.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(patchExpenseAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(patchExpenseAction.fulfilled, (state, action) => {
      state.loading = false
      expensesAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(patchExpenseAction.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(deleteExpenseAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
      state.loading = false
      expensesAdapter.removeOne(state, action.payload.id)
    })
    builder.addCase(deleteExpenseAction.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(postExpenseAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(postExpenseAction.fulfilled, (state, action) => {
      state.loading = false
      expensesAdapter.addOne(state, action.payload)
    })
    builder.addCase(postExpenseAction.rejected, (state) => {
      state.loading = false
    })
  },
})

export const expensesSelectors = expensesAdapter.getSelectors<RootState>(
  (state) => state.expenses
)
