import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { setModalActive } from 'store/slices/serviceLogsSlice.ts';
import { ServiceLogForm } from 'components/ServiceLogForm/ServiceLogForm.tsx';

export const ServiceLogsModal = () => {
  const { modalActive, editingLog } = useAppSelector(
    state => state.serviceLogs,
  );

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModalActive(false));
  };

  return (
    <Dialog open={modalActive} onClose={onClose} fullWidth maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          background: '#f5f5f5',
        }}>
        <DialogTitle>{editingLog ? 'Edit Log' : 'Create new log'}</DialogTitle>
        <DialogActions>
          <Button type="submit" form="service-log-form" variant="contained">
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Box>
      <DialogContent sx={{ background: '#f5f5f5' }}>
        <ServiceLogForm />
      </DialogContent>
    </Dialog>
  );
};
