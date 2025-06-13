import Cookies from 'js-cookie';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './types';

const initialState: IAuthState = {
  email: '',
  tokens: {
    access: '',
    refresh: ''
  },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IAuthState>) => {
      const {
        payload: { email, tokens }
      } = action;
      state.email = email;
      state.tokens = tokens;
      state.isAuthenticated = true;

      // Save access and refresh tokens in the cookies
      Cookies.set('access', tokens?.access as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax'
      });
      Cookies.set('refresh', tokens?.refresh as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax'
      });
      Cookies.set('logout', 'false');
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

export const { loginSuccess, logoutSuccess, checkAuthStatus } = authSlice.actions;

export default authSlice.reducer;
