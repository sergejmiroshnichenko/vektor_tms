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
        // id: String(state.draftsList.length + 1),
        id: dayjs().valueOf().toString(),
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
            isCompleted: true,
            status: 'saved',
            updatedAt: dayjs(),
          };
        }
        return item;
      });
    },
    setActiveDraftId: (state, action: PayloadAction<string>) => {
      state.activeDraftId = action.payload;
    },
    clearAllDrafts: state => {
      state.draftsList = [];
      state.activeDraftId = '';
    },
    deleteActiveDraft: (state, action: PayloadAction<string>) => {
      state.draftsList = state.draftsList.filter(
        draft => draft.id !== action.payload,
      );
      if (state.draftsList.length === 0) {
        state.activeDraftId = '';
      } else if (state.draftsList.length === 1) {
        state.activeDraftId = state.draftsList[0].id;
      } else {
        state.activeDraftId = String(
          state.draftsList[state.draftsList.length - 1].id,
        );
      }
    },
  },
});

export const {
  addDraft,
  completedDraft,
  setActiveDraftId,
  clearAllDrafts,
  deleteActiveDraft,
} = draftsSlice.actions;
export default draftsSlice.reducer;
