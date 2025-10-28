import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ru';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { setEndDate, setStartDate } from 'store/slices/serviceLogsSlice.ts';
import { CustomDatePicker } from 'components/CustomDatePicker.tsx';

dayjs.extend(isBetween);

export const DateRangeFilter = () => {
  const { startDate, endDate } = useAppSelector(state => state.serviceLogs);

  const dispatch = useAppDispatch();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          py: 2,
          maxWidth: '350px',
        }}>
        <CustomDatePicker
          label="Start date"
          value={startDate}
          onChange={newValue => dispatch(setStartDate(newValue))}
        />
        <CustomDatePicker
          label="End date"
          value={endDate}
          onChange={newValue => dispatch(setEndDate(newValue))}
          shouldDisabledDate={date => date.isBefore(startDate, 'day')}
        />
      </Box>
    </LocalizationProvider>
  );
};
