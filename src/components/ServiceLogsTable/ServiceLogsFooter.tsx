import { GridPagination } from '@mui/x-data-grid';
import { useAppSelector } from 'hooks/redux-hooks.ts';
import { Box, Typography, useTheme } from '@mui/material';

export const ServiceLogsFooter = () => {
  const { draftsList } = useAppSelector(state => state.serviceDrafts);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        mt: 3,
      }}>
      <Box
        sx={{
          background: theme.palette.primary.main,
          p: 0.5,
          color: theme.palette.primary.contrastText,
          minWidth: 60,
          borderRadius: 1.5,
          mb: 0.5,
          boxShadow: '0px 1px 5px rgba(0,0,0,0.5)',
        }}>
        <Typography fontSize="large" fontWeight={700}>
          {draftsList.length}
        </Typography>
        <Typography fontSize={10}>LOG</Typography>
        <Typography fontSize={10}>DRAFT</Typography>
      </Box>
      <GridPagination />
    </Box>
  );
};
