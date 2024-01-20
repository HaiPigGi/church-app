'use client';
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '@/lib/features/session/sessionSlice';
import { useAppDispatch } from './hook';

export const makeStore = () => {
  return configureStore({
    reducer: {
      session: sessionReducer,
    },
  });
};
