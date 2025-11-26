import { Dayjs } from 'dayjs';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';
import { IServiceLog } from 'types/IServiceLog.ts';

export interface IDraftTypes {
  id: string;
  status: 'idle' | 'saving' | 'saved';
  draft: FormValues;
  completedData?: IServiceLog;
  createdAt: string;
  updatedAt?: Dayjs;
  isCompleted: boolean; // draft has already filled
  isSelected?: boolean; // flag, active draft open
}
