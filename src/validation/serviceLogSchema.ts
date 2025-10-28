import * as yup from 'yup';
import dayjs from 'dayjs';

export const serviceLogSchema = yup.object({
  provider: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Provider must contain only english letters')
    .required('Provider is required'),
  serviceOrder: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Provider must contain only english letters')
    .required('Service order is required'),
  toggleButton: yup.string().oneOf(['truck', 'trailer']).required(),
  odometer: yup.number().typeError('Odometer must be a number').optional(),
  engineHours: yup
    .number()
    .typeError('Engine hours must be a number')
    .optional(),
  dateIn: yup.mixed<dayjs.Dayjs>().required('Start date is required'),
  dateOut: yup.mixed<dayjs.Dayjs>(),
  type: yup.string().oneOf(['planned', 'unplanned', 'emergency']).required(),
  serviceDescription: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, {
      message: 'Service Description must contain only english letters',
      excludeEmptyString: true,
    })
    .notRequired(),
});
