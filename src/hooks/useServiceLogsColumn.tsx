import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

import { IServiceLog, ServiceTypes } from 'types/IServiceLog';
import { HEADERS, SERVICE_LOGS_COLUMN_WIDTHS } from 'constants/serviceTypes';
import { getServiceTypeStyle } from 'helpers/getServiceTypeColor';
import { capitalize } from 'utils/stringUtils';

import {
  deleteLog,
  setEditingLog,
  setModalActive,
} from 'store/slices/serviceLogsSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import { HighlightText } from 'components/HighlightText.tsx';

export const useServiceLogsColumns = (
  searchQuery: string,
): GridColDef<IServiceLog>[] => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return useMemo(() => {
    const baseColumns: GridColDef<IServiceLog>[] = HEADERS.map(
      ({ field, headerName }) => {
        const width = SERVICE_LOGS_COLUMN_WIDTHS[field] ?? 130;

        return {
          field,
          headerName: headerName.toUpperCase(),
          width,
          renderCell: params => {
            const value = params.value;

            if (field === 'type') {
              const type = params.row.type as ServiceTypes;
              const { color, bg } = getServiceTypeStyle(type);

              return (
                <Typography
                  fontSize={13}
                  color={color}
                  sx={{
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    display: 'inline-block',
                    backgroundColor: bg,
                  }}>
                  {HighlightText(capitalize(String(value)), searchQuery)}
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
              return <Typography fontSize={13}>{value} ml</Typography>;
            }

            if (field === 'totalAmount') {
              return <Typography fontSize={13}>${value}</Typography>;
            }

            return HighlightText(String(value ?? ''), searchQuery);
          },
        };
      },
    );

    const actionColumn: GridColDef<IServiceLog> = {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 110,
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
              onClick={() => {
                dispatch(deleteLog(params.row.id));
                enqueueSnackbar('Service log removed', {
                  variant: 'success',
                });
              }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    };

    return [...baseColumns, actionColumn];
  }, [searchQuery, dispatch, enqueueSnackbar]);
};
