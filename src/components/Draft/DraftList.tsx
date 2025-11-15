import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { Tab, Tabs } from '@mui/material';
import { IDraftTypes } from 'types/IDraft.types.ts';
import { setActiveDraftId } from 'store/slices/draftsSlice.ts';

export const DraftList = () => {
  const { draftsList, activeDraftId } = useAppSelector(
    state => state.serviceDrafts,
  );
  console.log('draftList Component>>>>>>', draftsList);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Tabs
        value={activeDraftId}
        onChange={(_, newValue) => dispatch(setActiveDraftId(newValue))}
        sx={{ background: '#ccc', border: '1px solid black', height: '50px' }}>
        {draftsList.map((draft: IDraftTypes) => {
          console.log(
            'draft id >>',
            draft.id,
            'activeDraftId <<',
            activeDraftId,
          );
          return (
            <Tab
              key={draft.id}
              label={draft.isCompleted ? draft.draft.serviceOrder : 'New Draft'}
              value={draft.id}
            />
          );
        })}
      </Tabs>
    </div>
  );
};
