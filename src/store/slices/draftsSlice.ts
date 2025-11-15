import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDraftTypes } from 'types/IDraft.types.ts';
import dayjs from 'dayjs';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';
import { convertFormValuesToServiceLog } from 'components/ServiceLogForm/FormInitialValues.ts';

interface initialStateProps {
  draftsList: IDraftTypes[];
  activeDraftId: string;
}

const initialState: initialStateProps = {
  draftsList: [],
  activeDraftId: '',
};

const draftsSlice = createSlice({
  name: 'serviceDrafts',
  initialState,
  reducers: {
    addDraft: (state, action: PayloadAction<{ draft: FormValues }>) => {
      const newDraft: IDraftTypes = {
        id: String(state.draftsList.length + 1),
        createdAt: dayjs(),
        status: 'saving',
        draft: action.payload.draft,
        isCompleted: false,
      };
      const lastDraft = state.draftsList[state.draftsList.length - 1];
      if (!lastDraft || lastDraft.isCompleted) {
        state.draftsList.push(newDraft);
        state.activeDraftId = newDraft.id; // create activeDraftId
      }
    },
    completedDraft: (
      state,
      action: PayloadAction<{ id: string; draft: FormValues }>,
    ) => {
      state.draftsList = state.draftsList.map(item => {
        if (item.id === action.payload.id) {
          const convertData = convertFormValuesToServiceLog(
            item.id,
            action.payload.draft,
          );
          console.log('convertData', convertData);
          return {
            ...item,
            draft: convertData,
            isCompleted: !item.isCompleted,
            status: 'saved',
            updatedAt: dayjs(),
          };
        }
        return item;
      });
    },
    setActiveDraftId: (state, action: PayloadAction<string>) => {
      console.log('action payload >>', action.payload);
      state.activeDraftId = action.payload;
    },
  },
});

export const { addDraft, completedDraft, setActiveDraftId } =
  draftsSlice.actions;
export default draftsSlice.reducer;
