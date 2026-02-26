import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDraftTypes } from 'types/IDraft.types.ts';
import dayjs from 'dayjs';
import { DraftForm } from 'components/ServiceLogForm/FormValues.types.ts';
import {
  convertFormValuesToServiceLog,
  fromDraftForm,
} from 'components/ServiceLogForm/FormConverts.ts';
import { saveDrafts } from 'utils/storage.ts';

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
    addDraft: (state, action: PayloadAction<{ draft: DraftForm }>) => {
      const newDraft: IDraftTypes = {
        id: dayjs().valueOf().toString(),
        createdAt: dayjs().format('DD-MM-YYYY HH:mm:ss'),
        status: 'idle',
        draft: action.payload.draft,
        isCompleted: false,
      };
      const lastDraft = state.draftsList[state.draftsList.length - 1];
      if (!lastDraft || lastDraft.isCompleted) {
        state.draftsList.push(newDraft);
        state.activeDraftId = newDraft.id; // create activeDraftId
        saveDrafts(state.draftsList);
      }
    },

    setEditingStatus: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.draftsList.findIndex(
        draft => draft.id === action.payload.id,
      );
      if (index !== -1) {
        state.draftsList[index].status = 'editing';
      }
    },

    autoSavingDraft: (
      state,
      action: PayloadAction<{
        id: string;
        draft: DraftForm;
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
      saveDrafts(state.draftsList);
    },

    completedDraft: (
      state,
      action: PayloadAction<{ id: string; draft: DraftForm }>,
    ) => {
      state.draftsList = state.draftsList.map(item => {
        if (item.id !== action.payload.id) return item;

        return {
          ...item,
          isCompleted: true,
          status: 'saved',
          updatedAt: dayjs().format('DD-MM-YYYY HH:mm:ss'),
          completedData: convertFormValuesToServiceLog(
            item.id,
            fromDraftForm(action.payload.draft),
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
      saveDrafts([]);
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
    setDrafts: (state, action: PayloadAction<IDraftTypes[]>) => {
      state.draftsList = action.payload;
      const lastDraft = state.draftsList[state.draftsList.length - 1];

      state.activeDraftId =
        lastDraft && !lastDraft.isCompleted ? lastDraft.id : '';
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
  setDrafts,
} = draftsSlice.actions;
export default draftsSlice.reducer;
