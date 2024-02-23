import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import { AxiosError } from 'axios'
import { Expense } from '../../../types'
import { handleAxiosError } from '../../../utils'

type PostExpensePayload = {
  payload: {
    description: string
    amount: number
    date: string
    userId: string
    tags: string[]
  }
  onSuccess?: (expense: Expense) => void
  onError?: (error: string) => void
}

export const postExpenseAction = createAsyncThunk<Expense, PostExpensePayload>(
  'expenses/postOne',
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await api.post<Expense>(`/expenses/`, payload)

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
