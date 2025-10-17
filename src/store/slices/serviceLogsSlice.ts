import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IServiceLog } from 'types/IServiceLog';

export const fetchServiceLogs = createAsyncThunk<IServiceLog[]>(
  'serviceLogs/fetch',
  async () => {
    const response = await fetch('/serviceLogs.json');
    if (!response.ok) {
      throw new Error(`Failed fetch serviceLogs.json: ${response.status}`);
    }
    const data = await response.json();
    return data as IServiceLog[];
  },
);

interface serviceLogsState {
  logs: IServiceLog[];
  isLoading: boolean;
  error: string | null;
}

const initialState: serviceLogsState = {
  logs: [],
  isLoading: false,
  error: null,
};

const serviceLogsSlice = createSlice({
  name: 'serviceLogs',
  initialState,
  reducers: {
    deleteLog: (state, action) => {
      state.logs = state.logs.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchServiceLogs.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchServiceLogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.logs = action.payload;
    });
    builder.addCase(fetchServiceLogs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message ?? 'Error loading service logs';
    });
  },
});

export const { deleteLog } = serviceLogsSlice.actions;
export default serviceLogsSlice.reducer;
