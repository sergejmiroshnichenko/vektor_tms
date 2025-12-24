import dayjs from 'dayjs';
import { FormValues } from './FormValues.types.ts';
import { IServiceLog } from 'types/IServiceLog.ts';

export const getEmptyValues = (): FormValues => ({
  provider: '',
  serviceOrder: '',
  equipment: '',
  odometer: undefined,
  engineHours: undefined,
  dateIn: dayjs(),
  dateOut: dayjs().add(1, 'day'),
  type: 'planned', // default
  serviceDescription: '',
});

export const getEditValues = (editingLog: IServiceLog): FormValues => ({
  provider: editingLog.provider,
  serviceOrder: editingLog.serviceOrder,
  equipment: editingLog.equipment,
  type: editingLog.type,
  dateIn: dayjs(editingLog.completedDate),
  dateOut: null,
  odometer: editingLog.odometer,
  engineHours: editingLog.engineHours,
  serviceDescription: editingLog.serviceDescription,
});
