import { IServiceLog } from 'types/IServiceLog.ts';
import dayjs from 'dayjs';

export const cellFormatters: Partial<{
  [K in keyof IServiceLog]: (value: IServiceLog[K]) => string;
}> = {
  odometer: value => `${value} ml`,
  totalAmount: value => `$${value}`,
  completedDate: value => dayjs(value).format('DD/MM/YYYY'),
};
