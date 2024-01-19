'use client';
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '@/features/counter/sessionSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
  },
});
