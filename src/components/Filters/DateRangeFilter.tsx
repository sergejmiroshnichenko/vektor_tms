import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ru';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { setEndDate, setStartDate } from 'store/slices/serviceLogsSlice.ts';
import { CustomDataPicker } from 'components/CustomDatePicker.tsx';

dayjs.extend(isBetween);

export const DateRangeFilter = () => {
  const { startDate, endDate } = useAppSelector(state => state.serviceLogs);

  const dispatch = useAppDispatch();

  // const visibleLogs = logs.slice(page * pageSize, (page + 1) * pageSize);
  //
  // const filteredDateLogs = useMemo(() => {
  //   if (!startDate || !endDate) return visibleLogs;
  //
  //   return visibleLogs.filter(log =>
  //     dayjs(log.completedDate).isBetween(startDate, endDate, 'day', '[]'),
  //   );
  // }, [endDate, startDate, visibleLogs]);
  //
  // console.log('filteredDateLogs', filteredDateLogs);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '20px 0',
        }}>
        <CustomDataPicker
          label="Start date"
          value={startDate}
          onChange={newValue => dispatch(setStartDate(newValue))}
        />
        <CustomDataPicker
          label="End date"
          value={endDate}
          onChange={newValue => dispatch(setEndDate(newValue))}
        />
      </Box>
    </LocalizationProvider>
  );
};
