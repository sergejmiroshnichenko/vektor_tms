import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

interface CustomDatePickerProps {
  label: string;
  value?: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  defaultToday?: boolean;
  shouldDisabledDate?: (day: Dayjs) => boolean;
  required?: boolean;
}

export const CustomDatePicker = ({
  onChange,
  label,
  value,
  defaultToday = false,
  shouldDisabledDate,
  required = false,
}: CustomDatePickerProps) => {
  const resolvedValue = value ?? (defaultToday ? dayjs() : null);

  return (
    <DatePicker
      label={label}
      value={resolvedValue}
      onChange={onChange}
      shouldDisableDate={shouldDisabledDate}
      slotProps={{
        textField: {
          size: 'small',
          required,
          fullWidth: true,
          InputProps: {
            sx: {
              fontSize: 14,
              height: '100%',
            },
          },
        },
      }}
    />
  );
};
