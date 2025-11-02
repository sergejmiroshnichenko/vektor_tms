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
    .filter(log => {
      const date = dayjs(log.completedDate);
      if (startDate && endDate)
        return date.isBetween(startDate, endDate, 'day', '[]');
      if (startDate && !endDate)
        return date.isSame(startDate, 'day') || date.isAfter(startDate, 'day');
      if (!startDate && endDate)
        return date.isSame(endDate, 'day') || date.isBefore(endDate, 'day');
      return true;
    })
    .filter(log => {
      const q = searchQuery.trim().toLowerCase();
      return [
        log.serviceOrder,
        log.driver,
        log.equipment,
        log.serviceDescription,
        log.provider,
        log.type,
      ].some(value => {
        // console.log('value q', value.toLowerCase().includes(q));
        return value.toLowerCase().includes(q);
      });
    });
};
