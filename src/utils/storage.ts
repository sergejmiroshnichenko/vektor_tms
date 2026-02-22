import { IServiceLog } from 'types/IServiceLog.ts';
import { IDraftTypes } from 'types/IDraft.types.ts';

export const saveDrafts = (drafts: IDraftTypes[]) => {
  localStorage.setItem('drafts', JSON.stringify(drafts));
};

export const loadDrafts = () => {
  const data = localStorage.getItem('drafts');
  return data ? JSON.parse(data) : [];
};

export const saveServiceLogs = (logs: IServiceLog[]) => {
  localStorage.setItem('serviceLogs', JSON.stringify(logs));
};

export const loadServiceLogs = (): IServiceLog[] => {
  const data = localStorage.getItem('serviceLogs');
  return data ? JSON.parse(data) : [];
};
