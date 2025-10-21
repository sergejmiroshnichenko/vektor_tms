import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

export const CustomDataPicker = ({
  onChange,
  label,
  value,
}: CustomDatePickerProps) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          size: 'small',
          InputProps: {
            sx: {
              fontSize: 14,
              padding: '0px 14px',
            },
          },
          sx: {
            minWidth: 160,
            width: 160,
          },
        },
      }}
    />
  );
};
