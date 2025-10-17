import { configureStore } from '@reduxjs/toolkit';
import serviceLogsSlice from 'store/slices/serviceLogsSlice.ts';

export const store = configureStore({
  devTools: true,
  reducer: {
    serviceLogs: serviceLogsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
