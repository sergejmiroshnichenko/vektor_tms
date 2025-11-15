import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { setModalActive } from 'store/slices/serviceLogsSlice.ts';
import { ServiceLogForm } from 'components/ServiceLogForm/ServiceLogForm.tsx';
import { DraftList } from 'components/Draft/DraftList.tsx';

export const ServiceLogsModal = () => {
  const { modalActive, editingLog } = useAppSelector(
    state => state.serviceLogs,
  );

  const { activeDraftId, draftsList } = useAppSelector(
    state => state.serviceDrafts,
  );

  const isActiveSavedDraft = draftsList.find(
    draft => draft.isCompleted && draft.id === activeDraftId,
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
          {isActiveSavedDraft && (
            <Button variant="text" color="success">
              <CheckCircleIcon color="success" fontSize="small" />
              <Typography sx={{ ml: 0.5 }}>DRAFT SAVED</Typography>
            </Button>
          )}
          <Button type="submit" form="service-log-form" variant="contained">
            {isActiveSavedDraft ? 'SUBMIT DRAFT' : 'SAVE'}
          </Button>
          <Button onClick={onClose}>Close</Button>
          {!editingLog && (
            <>
              <Button variant="text">Delete draft</Button>
              <Button variant="text">Clear all drafts</Button>
            </>
          )}
        </DialogActions>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogContent sx={{ background: '#f5f5f5' }}>
          <ServiceLogForm />
        </DialogContent>
        {!editingLog && (
          <div style={{ width: '50%' }}>
            <DraftList />
          </div>
        )}
      </Box>
    </Dialog>
  );
};
