import { combineReducers } from '@reduxjs/toolkit';
import { rootAPI } from './apiSlice';

// Project Imports
import authReducer from '@/pages/authentication/redux/auth.slice';
import commonReducer from '@/pages/common/redux/common.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  [rootAPI.reducerPath]: rootAPI.reducer
});
