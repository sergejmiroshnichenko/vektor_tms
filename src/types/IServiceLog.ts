export type ServiceTypes = 'planned' | 'unplanned' | 'emergency';

export interface IServiceLog {
  id: string;
  serviceOrder: string;
  provider: string;
  providerId: string;
  truckId: string;
  equipment: string;
  driver: string;
  type: ServiceTypes;
  // startDate: string;
  // endDate: string;
  completedDate: string;
  odometer: number;
  engineHours: number;
  serviceDescription: string;
  totalAmount: number;
}
