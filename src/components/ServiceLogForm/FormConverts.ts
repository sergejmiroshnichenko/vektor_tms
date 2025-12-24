import { DraftForm, FormValues } from './FormValues.types.ts';
import { IServiceLog } from 'types/IServiceLog.ts';
import { capitalize } from 'helpers/stringHelpers.ts';
import dayjs from 'dayjs';

export const convertFormValuesToServiceLog = (
  id: string,
  form: FormValues,
  prev?: IServiceLog,
): IServiceLog => ({
  id,
  provider: capitalize(form.provider),
  serviceOrder: capitalize(form.serviceOrder),
  equipment: form.equipment,
  odometer: form.odometer ?? 0,
  engineHours: form.engineHours ?? 0,
  completedDate: dayjs(form.dateIn).format('YYYY-MM-DD'),
  type: form?.type ?? 'planned',
  serviceDescription: capitalize(form.serviceDescription) ?? '',
  driver: capitalize(prev?.driver) ?? '',
  totalAmount: prev?.totalAmount ?? 0,
});

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
