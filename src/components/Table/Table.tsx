import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, IconButton, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect } from 'react';
import { deleteLog, fetchServiceLogs } from 'store/slices/serviceLogsSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';

export const ServiceLogsTable = () => {
  const dispatch = useAppDispatch();

  const { logs, isLoading, error } = useAppSelector(state => state.serviceLogs);
  console.log('logs', logs);

  useEffect(() => {
    dispatch(fetchServiceLogs());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 50 }}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (error) return <p>Error occurred: {error}</p>;

  const headers = logs.length ? Object.keys(logs[0]).map(item => item) : [];

  const columns: GridColDef[] = headers.map(key => {
    let width = 120; // base width
    if (['id'].includes(key)) width = 20;
    if (['providerId'].includes(key)) width = 100;

    return {
      field: key,
      headerName: key.toUpperCase(),
      width,
    };
  });

  const rows = logs.map(log => ({
    ...log,
    totalAmount: '$' + log.totalAmount,
    odometer: log.odometer + ' ml',
  }));

  columns.push({
    field: 'delete',
    headerName: '',
    width: 50,
    sortable: false,
    filterable: false,
    renderCell: params => (
      <IconButton
        size="small"
        color="error"
        onClick={() => dispatch(deleteLog(params.row.id))}>
        <DeleteIcon />
      </IconButton>
    ),
  });

  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            fontSize: 11,
          },
          '& .MuiDataGrid-cell': {
            fontSize: 12,
          },
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Paper>
  );
};
