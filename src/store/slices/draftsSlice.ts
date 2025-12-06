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
        id: dayjs().valueOf().toString(),
        createdAt: dayjs().toISOString(),
        status: 'idle',
        draft: action.payload.draft,
        isCompleted: false,
      };
      const lastDraft = state.draftsList[state.draftsList.length - 1];
      if (!lastDraft || lastDraft.isCompleted) {
        state.draftsList.push(newDraft);
        state.activeDraftId = newDraft.id; // create activeDraftId
      }
    },

    setEditingStatus: (state, action: PayloadAction<{ id: string }>) => {
      state.draftsList = state.draftsList.map(item =>
        item.id === action.payload.id ? { ...item, status: 'editing' } : item,
      );
    },

    autoSavingDraft: (
      state,
      action: PayloadAction<{
        id: string;
        draft: FormValues;
        isChanged: boolean;
      }>,
    ) => {
      state.draftsList = state.draftsList.map(item => {
        if (item.id !== action.payload.id) return item;

        // update draft state to switch SUBMIT → SAVE (true => false) when editing completed draft
        if (item.isCompleted && action.payload.isChanged) {
          item.isCompleted = false;
        } //

        return {
          ...item,
          draft: { ...item.draft, ...action.payload.draft },
          status: 'saving',
        };
      });
    },

    completedDraft: (
      state,
      action: PayloadAction<{ id: string; draft: FormValues }>,
    ) => {
      state.draftsList = state.draftsList.map(item => {
        if (item.id !== action.payload.id) return item;

        return {
          ...item,
          isCompleted: true,
          status: 'saved',
          updatedAt: dayjs(),
          completedData: convertFormValuesToServiceLog(
            item.id,
            action.payload.draft,
          ),
        };
      });
    },

    setActiveDraftId: (state, action: PayloadAction<string>) => {
      state.activeDraftId = String(action.payload);
    },
    clearAllDrafts: state => {
      state.draftsList = [];
      state.activeDraftId = '';
    },
    deleteActiveDraft: (state, action: PayloadAction<string>) => {
      const index = state.draftsList.findIndex(
        draft => draft.id === action.payload,
      );

      if (index === -1) return;
      state.draftsList.splice(index, 1);

      if (!state.draftsList.length) {
        state.activeDraftId = '';
      } else if (index >= state.draftsList.length) {
        state.activeDraftId = state.draftsList[state.draftsList.length - 1].id;
      } else {
        state.activeDraftId = state.draftsList[index].id;
      }
    },
  },
});

export const {
  addDraft,
  setEditingStatus,
  autoSavingDraft,
  completedDraft,
  setActiveDraftId,
  clearAllDrafts,
  deleteActiveDraft,
} = draftsSlice.actions;
export default draftsSlice.reducer;
