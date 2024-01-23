import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'

type PostUserPayload = {
  payload: {
    name: string
    email: string
    password: string
  }
  onSuccess?: () => void
  onError?: (error: any) => void
}

export const postUserAction = createAsyncThunk<undefined, PostUserPayload>(
  'auth/getUser',
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      await api.post<undefined>(`/users/`, payload)

      onSuccess?.()
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
