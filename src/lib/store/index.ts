// src/lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import pairsReducer from '../slices/pairsSlice';

export const store = configureStore({
  reducer: {
    pairs: pairsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
