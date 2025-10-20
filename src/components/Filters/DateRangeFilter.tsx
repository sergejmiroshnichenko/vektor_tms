import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { useAppSelector } from 'hooks/redux-hooks.ts';
import { getPaginatedFilteredLogs } from 'helpers/getPaginatedFilteredLogs.ts';

export const DateRangeFilter = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const { logs, selectedServiceTypes, page, pageSize } = useAppSelector(
    state => state.serviceLogs,
  );

  const visibleLogs = getPaginatedFilteredLogs(
    logs,
    selectedServiceTypes,
    page,
    pageSize,
  );

  console.log('visibleLogs in DatePicker', visibleLogs);

  console.log('startDate', startDate, 'endDate', endDate);

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
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={newValue => setStartDate(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              InputProps: {
                sx: {
                  fontSize: 14,
                  padding: '0px 14px',
                },
              },
              sx: {
                minWidth: 160,
                width: 160,
              },
            },
          }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={newValue => setEndDate(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              InputProps: {
                sx: {
                  fontSize: 14,
                  padding: '0px 14px',
                },
              },
              sx: { minWidth: 160, width: 160 },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
