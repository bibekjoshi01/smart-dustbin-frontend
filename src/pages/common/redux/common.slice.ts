import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from './types';

const initialState: IInitialState = {
  message: '',
  variant: 'error' // Default variant
};


// Common slice for handling errors, messages
export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {

    // Set a message with variant (success, warning, error, etc.)
    setMessage: (state, { payload }) => {
      state.message = payload.message;
      state.variant = payload.variant;
    },

    // Clear the message and variant
    clearMessage: (state) => {
      state.message = '';
      state.variant = 'error';
    }
  }
});

export const { setMessage, clearMessage } = commonSlice.actions;

export default commonSlice.reducer;
