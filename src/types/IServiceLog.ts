export interface IServiceLog {
  id: string;
  serviceOrder: string;
  provider: string;
  providerId: string;
  truckId: string;
  equipment: string;
  driver: string;
  type: 'planned' | 'unplanned' | 'emergency';
  // startDate: string;
  // endDate: string;
  completedDate: string;
  odometer: number;
  engineHours: number;
  serviceDescription: string;
  totalAmount: number;
}
