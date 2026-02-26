import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect, useMemo } from 'react';
import {
  fetchServiceLogs,
  setPagination,
  setServiceLogs,
} from 'store/slices/serviceLogsSlice.ts';
import { getPaginatedFilteredLogs } from 'helpers/getPaginatedFilteredLogs.ts';
import { ServiceLogsFooter } from './ServiceLogsFooter.tsx';
import { loadServiceLogs } from 'utils/storage.ts';
import { useServiceLogsColumns } from 'hooks/useServiceLogsColumn.tsx';

export const ServiceLogsTable = () => {
  const dispatch = useAppDispatch();

  const {
    logs,
    isLoading,
    error,
    page,
    pageSize,
    selectedServiceTypes,
    startDate,
    endDate,
    searchQuery,
  } = useAppSelector(state => state.serviceLogs);

  useEffect(() => {
    const storedLogs = loadServiceLogs();

    if (storedLogs.length) {
      dispatch(setServiceLogs(storedLogs));
    } else {
      dispatch(fetchServiceLogs());
    }
  }, [dispatch]);

  const columns = useServiceLogsColumns(searchQuery);

  const filteredPaginatedLogs = useMemo(() => {
    return getPaginatedFilteredLogs({
      logs,
      page,
      pageSize,
      selectedServiceTypes,
      startDate,
      endDate,
      searchQuery,
    });
  }, [
    logs,
    page,
    pageSize,
    startDate,
    endDate,
    selectedServiceTypes,
    searchQuery,
  ]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" pt={6}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error)
    return (
      <Box display="flex" justifyContent="center" pt={6}>
        <Typography color="error" variant="body1">
          Error occurred: {error}
        </Typography>
      </Box>
    );

  return (
    <Paper sx={{ height: '570px', width: '100%' }}>
      <DataGrid
        rows={filteredPaginatedLogs}
        columns={columns}
        rowCount={logs.length}
        paginationMode="server"
        rowHeight={36}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            fontSize: 12,
          },
          '& .MuiDataGrid-cell': {
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
          },
        }}
        slots={{
          footer: ServiceLogsFooter,
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 50]}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={model => {
          dispatch(
            setPagination({ page: model.page, pageSize: model.pageSize }),
          );
        }}
      />
    </Paper>
  );
};
