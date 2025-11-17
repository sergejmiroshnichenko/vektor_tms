import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { IDraftTypes } from 'types/IDraft.types.ts';
import {
  deleteActiveDraft,
  setActiveDraftId,
} from 'store/slices/draftsSlice.ts';
import ClearIcon from '@mui/icons-material/Clear';

export const DraftList = () => {
  const { draftsList, activeDraftId } = useAppSelector(
    state => state.serviceDrafts,
  );
  console.log('draftList Component>>>>>>', draftsList);
  const dispatch = useAppDispatch();

  return (
    <Tabs
      value={activeDraftId}
      onChange={(_, newValue) => dispatch(setActiveDraftId(newValue))}
      sx={{ background: '#ccc', border: '1px solid black', height: '50px' }}>
      {draftsList.map((draft: IDraftTypes) => {
        return (
          <Tab
            key={draft.id}
            value={draft.id}
            sx={{
              position: 'relative',
              width: '150px',
              textTransform: 'none',
              pt: 0,
              background: 'white',
            }}
            label={
              <Box sx={{ marginRight: 'auto' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '5px',
                  }}>
                  {!draft.isCompleted && (
                    <Box
                      sx={{
                        background: 'black',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '8px',
                        p: '3px',
                        height: 'fit-content',
                      }}>
                      NEW
                    </Box>
                  )}
                  <Typography sx={{ fontSize: '15px' }}>
                    {draft.isCompleted ? draft.draft.serviceOrder : 'New Draft'}
                  </Typography>
                </Box>
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    p: 0,
                  }}
                  onClick={() => dispatch(deleteActiveDraft(activeDraftId))}>
                  <ClearIcon sx={{ fontSize: '18px' }} />
                </IconButton>
              </Box>
            }
          />
        );
      })}
    </Tabs>
  );
};
