import dayjs from 'dayjs';
import { ServiceTypes } from 'types/IServiceLog.ts';

export type FormValues = {
  provider: string;
  serviceOrder: string;
  equipment: string;
  odometer?: number;
  engineHours?: number;
  dateIn: dayjs.Dayjs;
  dateOut: dayjs.Dayjs | null;
  type: ServiceTypes;
  serviceDescription?: string | null;
};

export type DraftForm = Omit<FormValues, 'dateIn' | 'dateOut'> & {
  dateIn: string;
  dateOut: string | null;
};
