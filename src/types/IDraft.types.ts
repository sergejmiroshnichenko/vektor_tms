import { DraftForm } from 'components/ServiceLogForm/FormValues.types.ts';
import { IServiceLog } from 'types/IServiceLog.ts';

export interface IDraftTypes {
  id: string;
  status: 'idle' | 'editing' | 'saving' | 'saved';
  draft: DraftForm;
  completedData?: IServiceLog;
  createdAt: string;
  updatedAt?: string;
  isCompleted: boolean; // draft has already filled
  isSelected?: boolean; // flag, active draft open
}
