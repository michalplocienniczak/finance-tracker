import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'
import { Expense } from '../../../types'

type PostExpensePayload = {
  payload: {
    description: string
    amount: number
    date: string
    userId: string
    tags: string[]
  }
  onSuccess?: (expense: Expense) => void
  onError?: (error: any) => void
}

export const postExpenseAction = createAsyncThunk<Expense, PostExpensePayload>(
  'expenses/postOne',
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await api.post<Expense>(`/expenses/`, payload)

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
