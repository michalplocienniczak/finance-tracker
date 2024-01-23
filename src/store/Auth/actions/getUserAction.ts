import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'
import { User } from '../../../types'

type GetUserPayload = {
  userId: string
  onSuccess?: (response: User) => void
  onError?: (error: any) => void
}

export const getUserAction = createAsyncThunk<User, GetUserPayload>(
  'auth/getUser',
  async ({ userId, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const { data: user } = await api.get<User>(`/users/${userId}`)

      onSuccess?.(user)

      return user
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
