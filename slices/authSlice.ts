import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../helpers/constants'

export type IAuthState = {
  accessToken: string
  refreshToken: string
  loading: boolean
  loginErr: string
  registerErr: string
}

const initialState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  loading: false,
  loginErr: '',
  registerErr: '',
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (details: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await response.json()
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (details: {
    email: string
    password: string
  }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: details.email,
        password: details.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await response.json()
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return {
        ...initialState,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.loginErr = ''
      state.registerErr = ''
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false
      state.registerErr = 'failed to sign up user'
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.errorMessage) {
        state.loading = false
        state.registerErr = 'Failed to sign up user';
      } else {
        state.loading = false
        state.registerErr = ''
        state.loginErr = ''
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      }
    })
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.loginErr = ''
      state.registerErr = ''
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false
      state.registerErr = 'failed to login user'
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.errorMessage) {
        state.loading = false
        state.loginErr = 'Failed to login user'
      } else {
        state.loading = false
        state.registerErr = ''
        state.loginErr = ''
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      }
    })
  },
})

const { actions, reducer } = authSlice

export const { logout } = actions

export default reducer