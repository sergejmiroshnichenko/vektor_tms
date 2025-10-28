import { ServiceTypes } from 'types/IServiceLog.ts';

export const SERVICE_TYPE_STYLES: Record<
  ServiceTypes,
  { color: string; bg: string }
> = {
  planned: { color: 'green', bg: 'rgba(33,173,54,0.2)' },
  unplanned: { color: 'orange', bg: 'rgba(255,165,0,0.2)' },
  emergency: { color: 'red', bg: 'rgba(239,83,80,0.2)' },
};

export const getServiceTypeStyle = (type: ServiceTypes) =>
  SERVICE_TYPE_STYLES[type];
