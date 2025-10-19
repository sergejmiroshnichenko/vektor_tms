import { IServiceLog, ServiceTypes } from 'types/IServiceLog.ts';

export const getPaginatedFilteredLogs = (
  logs: IServiceLog[],
  selectedServiceTypes: ServiceTypes[],
  page: number,
  pageSize: number,
) => {
  const noFiltersSelected = selectedServiceTypes.length === 0;
  const matchesFiltersSelected = logs
    .slice(page * pageSize, (page + 1) * pageSize)
    .filter(log => selectedServiceTypes.includes(log.type));
  if (noFiltersSelected) return logs;

  return matchesFiltersSelected;
};
