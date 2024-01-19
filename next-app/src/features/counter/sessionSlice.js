'use client';
import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: '',
  },
  reducers: {
    setSession: (state, session) => {
      console.log('session : ', session);
      state.value = session.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
