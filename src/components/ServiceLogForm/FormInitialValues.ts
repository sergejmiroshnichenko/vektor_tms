import dayjs from 'dayjs';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';
import { IServiceLog } from 'types/IServiceLog.ts';

export const getEmptyValues = (): FormValues => ({
  provider: '',
  serviceOrder: '',
  equipment: '',
  odometer: undefined,
  engineHours: undefined,
  dateIn: dayjs(),
  dateOut: dayjs().add(1, 'day'),
  type: '',
  serviceDescription: '',
});

export const getInitialEditValues = (editingLog: IServiceLog): FormValues => ({
  provider: editingLog.provider,
  serviceOrder: editingLog.serviceOrder,
  equipment: editingLog.equipment,
  // driver: editingLog.driver,
  type: editingLog.type,
  dateIn: dayjs(editingLog.completedDate),
  odometer: editingLog.odometer,
  engineHours: editingLog.engineHours,
  serviceDescription: editingLog.serviceDescription,
  // totalAmount: editingLog.totalAmount,
});
