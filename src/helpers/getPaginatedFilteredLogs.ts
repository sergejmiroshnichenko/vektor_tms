import { IServiceLog, ServiceTypes } from 'types/IServiceLog.ts';
import dayjs, { Dayjs } from 'dayjs';

interface getPaginatedFilteredLogsProps {
  logs: IServiceLog[];
  selectedServiceTypes: ServiceTypes[];
  page: number;
  pageSize: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export const getPaginatedFilteredLogs = ({
  logs,
  page,
  pageSize,
  selectedServiceTypes,
  startDate,
  endDate,
}: getPaginatedFilteredLogsProps) => {
  return logs
    .slice(page * pageSize, (page + 1) * pageSize)
    .filter(log => selectedServiceTypes.includes(log.type))
    .filter(log =>
      dayjs(log.completedDate).isBetween(startDate, endDate, 'day', '[]'),
    );
};
