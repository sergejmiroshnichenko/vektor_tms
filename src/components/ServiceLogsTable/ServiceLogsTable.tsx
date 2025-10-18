import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, IconButton, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect } from 'react';
import { deleteLog, fetchServiceLogs } from 'store/slices/serviceLogsSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { getServiceTypeColor } from 'helpers/getServiceTypeColor.ts';
import { capitalize } from 'helpers/stringHelpers.ts';

export const ServiceLogsTable = () => {
  const dispatch = useAppDispatch();

  const { logs, isLoading, error } = useAppSelector(state => state.serviceLogs);

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

  const backgroundMap: Record<string, string> = {
    green: 'rgba(33, 173, 54, 0.2)',
    red: 'rgba(239, 83, 80, 0.2)',
    orange: 'rgba(255, 165, 0, 0.2)',
  };

  const columns: GridColDef[] = headers.map(key => {
    let width = 120; // base width
    if (['id'].includes(key)) width = 20;
    if (['providerId'].includes(key)) width = 100;

    return {
      field: key,
      renderCell: params => {
        const color = getServiceTypeColor(params.row.type);
        // console.log('color #', color); //  color # 'red'
        // console.log('params row type #', params.row.type); //  params row type # 'emergency'
        if (key === 'type') {
          return (
            <Typography
              fontSize={13}
              color={color}
              style={{
                borderRadius: 5,
                padding: 5,
                display: 'inline',
                background: backgroundMap[color],
              }}>
              {capitalize(params.value)}
            </Typography>
          );
        }
      },
      headerName: key.toUpperCase(),
      width,
    };
  });

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

  const rows = logs.map(log => ({
    ...log,
    totalAmount: '$' + log.totalAmount,
    odometer: log.odometer + ' ml',
  }));

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
