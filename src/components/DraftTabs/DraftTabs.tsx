import { styles } from './DraftTabs.styles.ts';
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
import { getEmptyValues } from 'components/ServiceLogForm/FormDefaults.ts';
import { setEditingLog } from 'store/slices/serviceLogsSlice.ts';
import { toDraftForm } from 'components/ServiceLogForm/FormConverts.ts';
import { colors } from 'theme/colors.ts';

export const DraftTabs = () => {
  const { draftsList, activeDraftId } = useAppSelector(
    state => state.serviceDrafts,
  );

  const dispatch = useAppDispatch();

  const disableAdd = draftsList.some(draft => !draft.isCompleted);

  const getTabBg = (draft: IDraftTypes) =>
    draft.isCompleted ? colors.tabCompletedBg : colors.tabDefaultBg;

  const renderBadge = (draft: IDraftTypes) => {
    const isActive = draft.id === activeDraftId;

    if (draft.isCompleted) return '✔️';

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
  };

  return (
    <Box sx={{ ...styles.container }}>
      <Tabs
        value={activeDraftId}
        onChange={(_, newValue) => dispatch(setActiveDraftId(newValue))}>
        {draftsList.map(draft => {
          return (
            <Tab
              key={draft.id}
              value={draft.id}
              sx={{
                ...styles.tab,
                background: getTabBg(draft),
              }}
              label={
                <Box sx={{ ...styles.tabContent }}>
                  <Box
                    sx={{
                      ...styles.titleRow,
                    }}>
                    {renderBadge(draft)}
                    <Typography
                      sx={{
                        ...styles.titleText,
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
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              }
            />
          );
        })}
      </Tabs>
      <Tooltip
        title={disableAdd && 'Please, complete the current draft'}
        disableHoverListener={!disableAdd}>
        <span>
          <Tab
            disabled={disableAdd}
            onClick={() => {
              dispatch(setEditingLog(null));
              dispatch(addDraft({ draft: toDraftForm(getEmptyValues()) }));
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
