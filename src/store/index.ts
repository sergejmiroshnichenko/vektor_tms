import { configureStore } from '@reduxjs/toolkit';
import serviceLogsSlice from 'store/slices/serviceLogsSlice.ts';
import draftsSlice from 'store/slices/draftsSlice.ts';

export const store = configureStore({
  devTools: true,
  reducer: {
    serviceLogs: serviceLogsSlice,
    serviceDrafts: draftsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
