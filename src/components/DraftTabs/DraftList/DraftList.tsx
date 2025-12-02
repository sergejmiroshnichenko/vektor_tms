import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import {
  Box,
  LinearProgress,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { IDraftTypes } from 'types/IDraft.types.ts';
import {
  addDraft,
  deleteActiveDraft,
  setActiveDraftId,
} from 'store/slices/draftsSlice.ts';
import ClearIcon from '@mui/icons-material/Clear';
import { getEmptyValues } from 'components/ServiceLogForm/FormInitialValues.ts';
import { styles } from './DraftList.styles.ts';

export const DraftList = () => {
  const { draftsList, activeDraftId } = useAppSelector(
    state => state.serviceDrafts,
  );
  console.log('draftList Component>>>>>>', draftsList);
  const dispatch = useAppDispatch();

  const disableAdd = draftsList.some(draft => !draft.isCompleted);

  const getTabBg = (draft: IDraftTypes) =>
    draft.isCompleted ? '#f5f5f5' : 'white';

  const renderBadge = (draft: IDraftTypes) => {
    const isActive = draft.id === activeDraftId;

    if (!draft.isCompleted) {
      if (isActive && draft.status === 'editing') {
        return (
          <Box>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: 2,
                width: 20,
              }}
            />
          </Box>
        );
      }
      return <Box sx={styles.newBadge}>NEW</Box>;
    }
    // Completed → checkmark
    return '✔️';
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tabs
        value={activeDraftId}
        onChange={(_, newValue) => dispatch(setActiveDraftId(newValue))}
        sx={{
          ...styles.tabs,
        }}>
        {draftsList.map((draft: IDraftTypes) => {
          return (
            <Tab
              key={draft.id}
              value={draft.id}
              sx={{
                ...styles.tab,
                background: getTabBg(draft),
              }}
              label={
                <Box sx={{ marginRight: 'auto' }}>
                  <Box
                    sx={{
                      ...styles.titleRow,
                    }}>
                    {renderBadge(draft)}
                    <Typography
                      sx={{
                        fontSize: '15px',
                      }}>
                      {draft.draft.serviceOrder || 'New Draft'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ...styles.closeIcon,
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(deleteActiveDraft(draft.id));
                    }}>
                    <ClearIcon sx={{ fontSize: '16px' }} />
                  </Box>
                </Box>
              }
            />
          );
        })}
      </Tabs>
      <Tooltip
        title={disableAdd ? 'Please, complete the current draft' : ''}
        disableHoverListener={!disableAdd}>
        <span>
          <Tab
            disabled={disableAdd}
            onClick={() => {
              dispatch(addDraft({ draft: getEmptyValues() }));
            }}
            sx={{
              ...styles.addIcon,
            }}
            label={
              <AddOutlinedIcon color={disableAdd ? 'disabled' : 'primary'} />
            }
          />
        </span>
      </Tooltip>
    </Box>
  );
};
