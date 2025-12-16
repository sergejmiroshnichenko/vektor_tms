import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import {
  setEditingLog,
  setModalActive,
} from 'store/slices/serviceLogsSlice.ts';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ServiceLogForm } from 'components/ServiceLogForm/ServiceLogForm.tsx';
import { DraftList } from 'components/DraftTabs/DraftList/DraftList.tsx';
import { EditActions } from './Actions/EditActions.tsx';
import { DraftActions } from './Actions/DraftActions.tsx';

export const ServiceLogsModal = () => {
  const { modalActive, editingLog } = useAppSelector(
    state => state.serviceLogs,
  );
  const { activeDraftId } = useAppSelector(state => state.serviceDrafts);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModalActive(false));
    dispatch(setEditingLog(null));
  };

  return (
    <Dialog open={modalActive} onClose={onClose} fullWidth maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: '#f5f5f5',
          px: 2,
        }}>
        <DialogTitle>{editingLog ? 'Edit Log' : 'Create new log'}</DialogTitle>

        {!editingLog && <DraftList />}

        <DialogActions>
          {editingLog ? <EditActions /> : <DraftActions />}
        </DialogActions>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogContent sx={{ background: '#f5f5f5' }}>
          {/* choice : form_mode=edit log / form_mode=add draft */}
          <ServiceLogForm key={editingLog ? editingLog.id : activeDraftId} />
        </DialogContent>
      </Box>
    </Dialog>
  );
};
