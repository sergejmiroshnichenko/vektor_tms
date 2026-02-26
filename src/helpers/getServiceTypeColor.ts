import { ServiceTypes } from 'types/IServiceLog.ts';
import { colors } from 'theme/colors.ts';

export const getServiceTypeStyle = (type?: ServiceTypes | '') => {
  switch (type) {
    case 'planned':
      return { color: colors.servicePlanned, bg: colors.servicePlannedBg };
    case 'unplanned':
      return { color: colors.serviceUnplanned, bg: colors.serviceUnplannedBg };
    case 'emergency':
      return { color: colors.serviceEmergency, bg: colors.serviceEmergencyBg };
    default:
      return { color: colors.serviceDefault, bg: colors.serviceDefaultBg };
  }
};
