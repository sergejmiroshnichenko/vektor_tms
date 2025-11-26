import dayjs from 'dayjs';
import { ServiceTypes } from 'types/IServiceLog.ts';

export type FormValues = {
  provider: string;
  serviceOrder: string;
  equipment: string;
  odometer: number | undefined;
  engineHours: number | undefined;
  dateIn: dayjs.Dayjs;
  dateOut: dayjs.Dayjs | null;
  type: ServiceTypes;
  serviceDescription: string | null;
};
