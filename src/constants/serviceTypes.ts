import { IServiceLog, ServiceTypes } from 'types/IServiceLog.ts';

export const SERVICE_TYPES: ServiceTypes[] = [
  'planned',
  'unplanned',
  'emergency',
];

export const HEADERS: { field: keyof IServiceLog; headerName: string }[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'serviceOrder', headerName: 'Service Order' },
  { field: 'provider', headerName: 'Provider' },
  { field: 'equipment', headerName: 'Equipment' },
  { field: 'driver', headerName: 'Driver' },
  { field: 'type', headerName: 'Type' },
  { field: 'completedDate', headerName: 'Completed Date' },
  { field: 'odometer', headerName: 'Odometer' },
  { field: 'engineHours', headerName: 'Engine Hours' },
  { field: 'serviceDescription', headerName: 'Service Description' },
  { field: 'totalAmount', headerName: 'Total Amount' },
];

export const SERVICE_LOGS_COLUMN_WIDTHS: Partial<
  Record<keyof IServiceLog, number>
> = {
  id: 40,
  provider: 150,
  serviceOrder: 110,
  serviceDescription: 210,
  totalAmount: 115,
  odometer: 110,
  engineHours: 110,
};
