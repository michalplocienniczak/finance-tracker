import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'
import { Expense } from '../../../types'

type PatchExpensePayload = {
  expenseId: string
  payload: {
    description?: string
    amount?: number
    date?: string
    tags?: string[]
  }
  onSuccess?: (expense: Expense) => void
  onError?: (error: any) => void
}

export const patchExpenseAction = createAsyncThunk<
  Expense,
  PatchExpensePayload
>(
  'expenses/patchOne',
  async ({ expenseId, payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await api.patch<Expense>(`/expenses/${expenseId}`, payload)

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
