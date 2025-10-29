import { ServiceTypes } from 'types/IServiceLog.ts';

export const SERVICE_TYPES: ServiceTypes[] = [
  'planned',
  'unplanned',
  'emergency',
];

export const HEADERS = [
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

export const SERVICE_LOGS_COLUMN_WIDTHS: Record<string, number> = {
  id: 40,
  // provider: 90,
  serviceOrder: 100,
  // equipment: 120,
  // driver: 150,
  serviceDescription: 200,
  // completedDate: 130,
  totalAmount: 110,
  odometer: 110,
  engineHours: 110,
  // type: 110,
};
