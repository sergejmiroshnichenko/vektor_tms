import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { Box, Skeleton, Tab, Tabs, Tooltip, Typography } from '@mui/material';
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
              component="div"
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
                    {!draft.isCompleted && (
                      <Box sx={{ ...styles.newBadge }}>NEW</Box>
                    )}
                    <Typography
                      sx={{
                        fontSize: '15px',
                      }}>
                      {draft.status === 'saving' ? (
                        <div>
                          <Skeleton
                            variant="circular"
                            width={10}
                            height={10}
                            animation="pulse"
                            sx={{ background: 'rgba(76, 175, 80, 0.4)' }}
                          />{' '}
                          `${draft.draft.serviceOrder}`
                        </div>
                      ) : (
                        'New Draft'
                      )}
                    </Typography>
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      ...styles.closeIcon,
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(deleteActiveDraft(draft.id));
                    }}>
                    <ClearIcon sx={{ fontSize: '18px' }} />
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
            label={
              <AddOutlinedIcon color={disableAdd ? 'disabled' : 'primary'} />
            }
            sx={{
              ...styles.addIcon,
            }}
          />
        </span>
      </Tooltip>
    </Box>
  );
};
