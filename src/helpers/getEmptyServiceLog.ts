import { IServiceLog } from 'types/IServiceLog.ts';
import dayjs from 'dayjs';

export const getEmptyServiceLog = (): IServiceLog => ({
  id: '',
  serviceOrder: '',
  provider: '',
  equipment: '',
  driver: '',
  type: 'planned',
  completedDate: dayjs().format('YYYY-MM-DD'),
  odometer: 0,
  engineHours: 0,
  serviceDescription: '',
  totalAmount: 0,
});
