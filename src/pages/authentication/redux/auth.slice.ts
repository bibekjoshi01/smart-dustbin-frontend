import Cookies from 'js-cookie';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './types';

const initialState: IAuthState = {
  id: 0,
  email: '',
  isActive: false,
  createdAt: '',
  isAuthenticated: false,
  message: '',
  accessToken: undefined
};

type LoginSuccessPayload = {
  accessToken: string;
  message: string;
};

type AuthStatePayload = {
  id: number;
  email: string;
  isActive: boolean;
  createdAt: string;
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      const { accessToken, message } = action.payload;
      state.accessToken = accessToken;
      state.message = message;
      state.isAuthenticated = true;

      // Save access and refresh tokens in the cookies
      Cookies.set('access', accessToken as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax'
      });
      Cookies.set('logout', 'false');
    },
    setAuthSate: (state, action: PayloadAction<AuthStatePayload>) => {
      const {
        payload: { email, id, isActive, createdAt }
      } = action;
      state.id = id
      state.email = email;
      state.isActive = isActive;
      state.createdAt = createdAt;
    },
    logoutSuccess: () => {
      Cookies.remove('access', { path: '/' });
      Cookies.remove('refresh', { path: '/' });
      Cookies.set('logout', 'true');
      return initialState;
    },
    checkAuthStatus: (state) => {
      const accessToken = Cookies.get('access');
      const logoutFlag = Cookies.get('logout');

      if (!accessToken || logoutFlag === 'true') {
        // No valid token, reset authentication state
        return initialState;
      }
      // Keep the current state if token exists
      return state;
    },
  }
});

export const { loginSuccess, logoutSuccess, checkAuthStatus, setAuthSate } = authSlice.actions;

export default authSlice.reducer;
