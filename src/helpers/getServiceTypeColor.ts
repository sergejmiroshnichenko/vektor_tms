import { ServiceTypes } from 'types/IServiceLog.ts';

export const getServiceTypeColor = (type: ServiceTypes) => {
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
