import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, IconButton, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect, useMemo } from 'react';
import {
  deleteLog,
  fetchServiceLogs,
  setPagination,
} from 'store/slices/serviceLogsSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getServiceTypeColor } from 'helpers/getServiceTypeColor.ts';
import { capitalize } from 'helpers/stringHelpers.ts';
import { getPaginatedFilteredLogs } from 'helpers/getPaginatedFilteredLogs.ts';
import {
  HEADERS,
  SERVICE_LOGS_COLUMN_WIDTHS,
  SERVICE_TYPE_BG_COLOR,
} from 'constants/serviceTypes.ts';

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
    dispatch(fetchServiceLogs());
  }, [dispatch]);

  const columns: GridColDef[] = HEADERS.map(({ field, headerName }) => {
    const width = SERVICE_LOGS_COLUMN_WIDTHS[field] ?? 130;
    return {
      field,
      headerName: headerName.toUpperCase(),
      width,
      renderCell: params => {
        const type = params.row.type;
        const color = getServiceTypeColor(type);
        const value = params.value;
        // console.log('color #', color); //  color # 'red'
        // console.log('params row type #', params.row.type); //  params row type # 'emergency'
        if (field === 'type') {
          return (
            <Typography
              fontSize={13}
              color={color}
              style={{
                borderRadius: 5,
                padding: 5,
                display: 'inline',
                background: SERVICE_TYPE_BG_COLOR[type],
              }}>
              {capitalize(params.value)}
            </Typography>
          );
        }
        if (field === 'odometer') {
          return <Typography fontSize={12}>{value + ' ml'}</Typography>;
        }
        if (field === 'totalAmount') {
          return <Typography fontSize={13}>{'$' + value}</Typography>;
        }
      },
    };
  });

  columns.push({
    field: 'action',
    headerName: '',
    sortable: false,
    filterable: false,
    renderCell: params => (
      <>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => dispatch(deleteLog(params.row.id))}>
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => dispatch(deleteLog(params.row.id))}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  });

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
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 50 }}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (error) return <p>Error occurred: {error}</p>;

  return (
    <Paper sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={filteredPaginatedLogs}
        columns={columns}
        rowCount={logs.length}
        paginationMode="server"
        rowHeight={36}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            fontSize: 11,
          },
          '& .MuiDataGrid-cell': {
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
          },
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
