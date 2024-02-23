import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import { AxiosError } from 'axios'
import { User } from '../../../types'
import { handleAxiosError } from '../../../utils'

type GetUserPayload = {
  userId: string
  onSuccess?: (response: User) => void
  onError?: (error: string) => void
}

export const getUserAction = createAsyncThunk<User, GetUserPayload>(
  'auth/getUser',
  async ({ userId, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const { data: user } = await api.get<User>(`/users/${userId}`)

      onSuccess?.(user)

      return user
    } catch (error) {
      const err = handleAxiosError(error as AxiosError)

      onError?.(err)

      return rejectWithValue(err)
    }
  }
)
