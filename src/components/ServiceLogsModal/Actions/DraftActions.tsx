import { Box, Button, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { clearAllDrafts, deleteActiveDraft } from 'store/slices/draftsSlice.ts';
import { setModalActive } from 'store/slices/serviceLogsSlice.ts';

export const DraftActions = () => {
  const dispatch = useAppDispatch();
  const { activeDraftId, draftsList } = useAppSelector(
    state => state.serviceDrafts,
  );

  const isActiveSavedDraft = draftsList.find(
    draft => draft.isCompleted && draft.id === activeDraftId,
  );

  return (
    <div>
      {/* under right panel */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: 2,
        }}>
        <Button
          size="small"
          variant="text"
          onClick={() => dispatch(clearAllDrafts())}
          color="inherit"
          startIcon={<DeleteOutlineIcon fontSize="small" />}>
          Clear all drafts
        </Button>

        <Button
          size="small"
          variant="text"
          onClick={() => dispatch(setModalActive(false))}>
          Close
        </Button>
      </Box>

      {/* below right panel */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'flex-end',
        }}>
        {isActiveSavedDraft && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <CheckCircleIcon color="success" fontSize="small" />
            <Typography
              component="span"
              sx={{ color: 'green', fontSize: '14px' }}>
              DRAFT SAVED
            </Typography>
          </Box>
        )}
        <Button
          size="small"
          variant="text"
          color="inherit"
          startIcon={<DeleteOutlineIcon fontSize="small" />}
          onClick={() => dispatch(deleteActiveDraft(activeDraftId))}>
          Delete draft
        </Button>

        <Button
          type="submit"
          form="service-log-form"
          variant="contained"
          size="small">
          {isActiveSavedDraft ? 'SUBMIT DRAFT' : 'SAVE'}
        </Button>
      </Box>
    </div>
  );
};
