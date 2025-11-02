import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect, useMemo } from 'react';
import {
  deleteLog,
  fetchServiceLogs,
  setEditingLog,
  setModalActive,
  setPagination,
} from 'store/slices/serviceLogsSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getServiceTypeStyle } from 'helpers/getServiceTypeColor.ts';
import { capitalize } from 'helpers/stringHelpers.ts';
import { getPaginatedFilteredLogs } from 'helpers/getPaginatedFilteredLogs.ts';
import { HEADERS, SERVICE_LOGS_COLUMN_WIDTHS } from 'constants/serviceTypes.ts';
import { IServiceLog, ServiceTypes } from 'types/IServiceLog.ts';
import { HighlightTextParts } from 'components/HighlightTextParts.tsx';
import dayjs from 'dayjs';

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
    if (!logs.length) {
      dispatch(fetchServiceLogs());
    }
  }, [dispatch, logs.length]);

  const columns: GridColDef<IServiceLog>[] = HEADERS.map(
    ({ field, headerName }) => {
      const width = SERVICE_LOGS_COLUMN_WIDTHS[field] ?? 130;
      return {
        field,
        headerName: headerName.toUpperCase(),
        width,
        renderCell: params => {
          const type = params.row.type as ServiceTypes;
          const value = params.value;
          // console.log('color #', color); //  color # 'red'
          // console.log('params row type #', params.row.type); //  params row type # 'emergency'
          if (field === 'type') {
            const { color, bg } = getServiceTypeStyle(type);
            return (
              <Typography
                fontSize={13}
                color={color}
                style={{
                  borderRadius: 5,
                  padding: 5,
                  display: 'inline',
                  background: bg,
                }}>
                {HighlightTextParts(capitalize(params.value), searchQuery)}
              </Typography>
            );
          }
          if (field === 'completedDate') {
            return (
              <Typography fontSize={13}>
                {dayjs(value).format('DD/MM/YYYY')}
              </Typography>
            );
          }
          if (field === 'odometer') {
            return <Typography fontSize={13}>{value + ' ml'}</Typography>;
          }
          if (field === 'totalAmount') {
            return <Typography fontSize={13}>{'$' + value}</Typography>;
          }
          return <>{HighlightTextParts(String(params.value), searchQuery)}</>;
        },
      };
    },
  );

  columns.push({
    field: 'action',
    headerName: '',
    sortable: false,
    filterable: false,
    renderCell: params => (
      <>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(setEditingLog(params.row));
              dispatch(setModalActive(true));
            }}>
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => dispatch(deleteLog(params.row.id))}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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
            fontSize: 12,
          },
          '& .MuiDataGrid-cell': {
            fontSize: 14,
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
