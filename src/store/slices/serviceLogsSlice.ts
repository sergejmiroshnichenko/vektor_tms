import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IServiceLog, ServiceTypes } from 'types/IServiceLog';
import { SERVICE_TYPES } from 'constants/serviceTypes.ts';
import { Dayjs } from 'dayjs';

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
  selectedServiceTypes: ServiceTypes[];
  page: number;
  pageSize: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const initialState: serviceLogsState = {
  logs: [],
  isLoading: false,
  error: null,
  selectedServiceTypes: [...SERVICE_TYPES],
  page: 0,
  pageSize: 10,
  startDate: null,
  endDate: null,
};

const serviceLogsSlice = createSlice({
  name: 'serviceLogs',
  initialState,
  reducers: {
    deleteLog: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter(item => item.id !== action.payload);
    },
    setSelectedServiceTypes: (state, action: PayloadAction<ServiceTypes[]>) => {
      state.selectedServiceTypes =
        action.payload.length === 0 ? [...SERVICE_TYPES] : action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>,
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setStartDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.endDate = action.payload;
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

export const {
  deleteLog,
  setPagination,
  setSelectedServiceTypes,
  setStartDate,
  setEndDate,
} = serviceLogsSlice.actions;
export default serviceLogsSlice.reducer;
