import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'
import { Expense } from '../../../types'

type GetExpenseByIdPayload = {
  expenseId: string
  onSuccess?: (response: Expense) => void
  onError?: (error: any) => void
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
