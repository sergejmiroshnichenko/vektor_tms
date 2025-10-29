export type ServiceTypes = 'planned' | 'unplanned' | 'emergency';

export interface IServiceLog {
  id: string;
  serviceOrder: string;
  provider: string;
  equipment: string;
  driver: string;
  type: ServiceTypes;
  completedDate: string;
  odometer: number;
  engineHours: number;
  serviceDescription: string;
  totalAmount: number;
}
