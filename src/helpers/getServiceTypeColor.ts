import { ServiceTypes } from 'types/IServiceLog.ts';

export const getServiceTypeStyle = (type?: ServiceTypes | '') => {
  switch (type) {
    case 'planned':
      return { color: 'green', bg: 'rgba(33,173,54,0.2)' };
    case 'unplanned':
      return { color: 'orange', bg: 'rgba(255,165,0,0.2)' };
    case 'emergency':
      return { color: 'red', bg: 'rgba(239,83,80,0.2)' };
    default:
      return { color: '#9e9e9e', bg: '#f5f5f5' };
  }
};
