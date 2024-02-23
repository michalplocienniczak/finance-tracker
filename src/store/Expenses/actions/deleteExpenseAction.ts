import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import { AxiosError } from 'axios'
import { Expense } from '../../../types'
import { handleAxiosError } from '../../../utils'

type DeleteExpensePayload = {
  expenseId: string
  onSuccess?: (expense: Expense) => void
  onError?: (error: string) => void
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
    } catch (error) {
      const err = handleAxiosError(error as AxiosError)

      onError?.(err)

      return rejectWithValue(err)
    }
  }
)
