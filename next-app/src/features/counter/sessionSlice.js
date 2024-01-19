'use client';
import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: '',
  },
  reducers: {
    setSession: (state, action) => {
      console.log('session : ', action.payload);
      state.value = action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
