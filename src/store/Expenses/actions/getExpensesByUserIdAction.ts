import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import { AxiosError } from 'axios'
import { Expense } from '../../../types'
import { handleAxiosError } from '../../../utils'

type GetExpensesByUserIdPayload = {
  userId: string
  onSuccess?: (response: Expense[]) => void
  onError?: (error: string) => void
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
    } catch (error) {
      const err = handleAxiosError(error as AxiosError)

      onError?.(err)

      return rejectWithValue(err)
    }
  }
)
