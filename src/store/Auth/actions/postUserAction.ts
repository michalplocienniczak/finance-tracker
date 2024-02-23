import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import { AxiosError } from 'axios'
import { handleAxiosError } from '../../../utils'

type PostUserPayload = {
  payload: {
    name: string
    email: string
    password: string
  }
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const postUserAction = createAsyncThunk<undefined, PostUserPayload>(
  'auth/getUser',
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      await api.post<undefined>(`/users/`, payload)

      onSuccess?.()
    } catch (error) {
      const err = handleAxiosError(error as AxiosError)

      onError?.(err)

      return rejectWithValue(err)
    }
  }
)
