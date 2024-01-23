import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'
import { Expense } from '../../../types'

type GetExpensesByUserIdPayload = {
  userId: string
  onSuccess?: (response: Expense[]) => void
  onError?: (error: any) => void
}

export const getExpensesByUserIdAction = createAsyncThunk<
  Expense[],
  GetExpensesByUserIdPayload
>(
  'expenses/getUser',
  async ({ userId, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const { data: expenses } = await api.get<Expense[]>(
        `/expenses?userId=${userId}`
      )

      onSuccess?.(expenses)

      return expenses
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
