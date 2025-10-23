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
      const q = searchQuery.toLowerCase();
      return (
        log.serviceOrder.toLowerCase().includes(q) ||
        log.driver.toLowerCase().includes(q) ||
        log.equipment.toLowerCase().includes(q) ||
        log.serviceDescription.toLowerCase().includes(q) ||
        log.type.toLowerCase().includes(q)
      );
    });
};
