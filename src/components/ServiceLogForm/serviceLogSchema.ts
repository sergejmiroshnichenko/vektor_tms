import * as yup from 'yup';
import dayjs from 'dayjs';

export const serviceLogSchema = yup.object({
  provider: yup
    .string()
    .matches(/^[A-Za-z]/, 'Provider must start with an English letter')
    .matches(/^[A-Za-z](?!.*([.\-\s])\1)[A-Za-z0-9.\-\s]*$/, 'Invalid format')
    .required('Provider is required'),
  serviceOrder: yup
    .string()
    .matches(/^[A-Za-z]/, 'Service Order must start with an English letter')
    .matches(/^[A-Za-z](?!.*([.\-\s])\1)[A-Za-z0-9.\-\s]*$/, 'Invalid format')
    .required('Service Order is required'),
  equipment: yup
    .string()
    .oneOf(['truck', 'trailer'], 'Equipment type is required')
    .required('Equipment type is required'),
  odometer: yup.number().typeError('Odometer must be a number').optional(),
  engineHours: yup
    .number()
    .typeError('Engine hours must be a number')
    .optional(),
  dateIn: yup.mixed<dayjs.Dayjs>().required('Start date is required'),
  dateOut: yup.mixed<dayjs.Dayjs>(),
  type: yup
    .string()
    .required('Service Type is required')
    .oneOf(['planned', 'unplanned', 'emergency'], 'Service type is required'),
  serviceDescription: yup
    .string()
    .typeError('Service Description must be a letters')
    .matches(/^[A-Za-z\s]+$/, {
      message: 'Service Description must contain only english letters',
      excludeEmptyString: true,
    })
    .notRequired(),
});
