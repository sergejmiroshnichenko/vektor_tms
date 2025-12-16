import {
  DraftForm,
  FormValues,
} from 'components/ServiceLogForm/FormValues.types.ts';
import dayjs from 'dayjs';

export const toDraftForm = (form: FormValues): DraftForm => ({
  ...form,
  dateIn: form.dateIn.toISOString(),
  dateOut: form.dateOut ? form.dateOut.toISOString() : null,
});

export const fromDraftForm = (draft: DraftForm): FormValues => ({
  ...draft,
  dateIn: dayjs(draft.dateIn),
  dateOut: draft.dateOut ? dayjs(draft.dateOut) : null,
});
