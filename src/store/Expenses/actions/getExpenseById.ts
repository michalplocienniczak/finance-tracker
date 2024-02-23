import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import { AxiosError } from 'axios'
import { Expense } from '../../../types'
import { handleAxiosError } from '../../../utils'

type GetExpenseByIdPayload = {
  expenseId: string
  onSuccess?: (response: Expense) => void
  onError?: (error: string) => void
}

export const getExpenseByIdAction = createAsyncThunk<
  Expense,
  GetExpenseByIdPayload
>(
  'expenses/getOne',
  async ({ expenseId, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const { data: expense } = await api.get<Expense>(`/expenses/${expenseId}`)

      onSuccess?.(expense)

      return expense
    } catch (error) {
      const err = handleAxiosError(error as AxiosError)

      onError?.(err)

      return rejectWithValue(err)
    }
  }
)
