import { ServiceType } from 'types/IServiceLog.ts';

export const getServiceTypeColor = (type: ServiceType) => {
  switch (type) {
    case 'planned':
      return 'green';
    case 'unplanned':
      return 'orange';
    case 'emergency':
      return 'red';
    default:
      return 'black';
  }
};
