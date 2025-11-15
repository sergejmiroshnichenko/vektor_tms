import { Dayjs } from 'dayjs';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';
import { IServiceLog } from 'types/IServiceLog.ts';

export interface IDraftTypes {
  id: string;
  status: 'saving' | 'saved' | 'error';
  draft: FormValues | IServiceLog;
  createdAt: Dayjs;
  updatedAt?: Dayjs;
  isCompleted: boolean; // draft has already filled
  isSelected?: boolean; // flag, active draft open
}
