import { IServiceLog, ServiceTypes } from 'types/IServiceLog.ts';
import dayjs, { Dayjs } from 'dayjs';

interface getPaginatedFilteredLogsProps {
  logs: IServiceLog[];
  selectedServiceTypes: ServiceTypes[];
  page: number;
  pageSize: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  searchQuery: string;
}

export const getPaginatedFilteredLogs = ({
  logs,
  page,
  pageSize,
  selectedServiceTypes,
  startDate,
  endDate,
  searchQuery,
}: getPaginatedFilteredLogsProps) => {
  return logs
    .slice(page * pageSize, (page + 1) * pageSize)
    .filter(log => selectedServiceTypes.includes(log.type))
    .filter(log =>
      dayjs(log.completedDate).isBetween(startDate, endDate, 'day', '[]'),
    )
    .filter(log => {
      const q = searchQuery.trim().toLowerCase();
      return [
        log.serviceOrder,
        log.driver,
        log.equipment,
        log.serviceDescription,
        log.type,
      ].some(value => value.toLowerCase().includes(q));
    });
};
