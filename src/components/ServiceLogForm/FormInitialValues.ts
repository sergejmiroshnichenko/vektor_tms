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
  type: 'planned', // default
  serviceDescription: '',
});

export const getInitialEditValues = (editingLog: IServiceLog): FormValues => ({
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

export const convertFormValuesToServiceLog = (
  id: string,
  form: FormValues,
  prev?: IServiceLog,
): IServiceLog => ({
  id,
  provider: form.provider,
  serviceOrder: form.serviceOrder,
  equipment: form.equipment,
  odometer: form.odometer ?? 0,
  engineHours: form.engineHours ?? 0,
  completedDate: dayjs(form.dateIn).format('YYYY-MM-DD'),
  type: form?.type ?? 'planned',
  serviceDescription: form.serviceDescription ?? '',
  driver: prev?.driver ?? '',
  totalAmount: prev?.totalAmount ?? 0,
});
