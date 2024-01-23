import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../api'
import axios from 'axios'
import { User } from '../../../types'

type LoginPayload = {
  payload: {
    email: string
    password: string
  }
  onSuccess?: (response: User) => void
  onError?: (error: any) => void
}

export const loginAction = createAsyncThunk<User, LoginPayload>(
  'auth/login',
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const response = await api.get<User[]>(`/users?email=${payload.email}`)

      if (response.data.length === 0) {
        throw new Error('Wrong email or password')
      }

      const user = response.data[0]

      if (user.password !== payload.password) {
        throw new Error('Wrong email or password')
      }

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
