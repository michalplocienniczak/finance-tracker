import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'
import { Expense } from '../../../types'

type DeleteExpensePayload = {
  expenseId: string
  onSuccess?: (expense: Expense) => void
  onError?: (error: any) => void
}

export const deleteExpenseAction = createAsyncThunk<
  Expense,
  DeleteExpensePayload
>(
  'expenses/deleteOne',
  async ({ expenseId, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await api.delete<Expense>(`/expenses/${expenseId}`)

      const expense = res.data

      onSuccess?.(expense)

      return expense
    } catch (error: any) {
      onError?.(error)

      return rejectWithValue(
        axios.isAxiosError(error) && error.response
          ? error.response.data
          : { error }
      )
    }
  }
)
