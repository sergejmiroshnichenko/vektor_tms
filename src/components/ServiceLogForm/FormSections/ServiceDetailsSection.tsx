import ArticleIcon from '@mui/icons-material/Article';
import { Box, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { CustomDatePicker } from 'components/CustomDatePicker.tsx';
import dayjs from 'dayjs';
import { InputField } from 'components/InputField.tsx';
import { SERVICE_TYPES } from 'constants/serviceTypes.ts';
import { ServiceTypes } from 'types/IServiceLog.ts';
import { getServiceTypeStyle } from 'helpers/getServiceTypeColor.ts';
import { capitalize } from 'helpers/stringHelpers.ts';
import { Section } from 'components/Section.tsx';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';
import { useEffect } from 'react';

interface ServiceDetailsProps {
  control: Control<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

export const ServiceDetailsSection = ({
  control,
  watch,
  setValue,
}: ServiceDetailsProps) => {
  const type = watch('type');
  const { bg } = getServiceTypeStyle(type);

  const dateIn = useWatch({ control, name: 'dateIn' });

  useEffect(() => {
    if (dateIn) {
      // update dateOut every time, when updated dateIn
      setValue('dateOut', dateIn.add(1, 'day'));
    }
  }, [dateIn, setValue]);

  return (
    <Section
      title="3.Service details"
      icon={<ArticleIcon color="primary" />}
      direction={'column'}>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <Controller
            name="dateIn"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                label="Date in"
                value={field.value}
                required
                defaultToday={true}
                onChange={newValue => field.onChange(newValue || dayjs())}
                shouldDisabledDate={date => date.isBefore(dayjs(), 'day')}
              />
            )}
          />
          <Controller
            name="dateOut"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                label="Date out"
                value={field.value}
                onChange={newValue =>
                  field.onChange(newValue ?? dateIn.add(1, 'day'))
                }
                shouldDisabledDate={date =>
                  date.isBefore(dateIn, 'day') || date.isSame(dateIn, 'day')
                }
              />
            )}
          />
        </LocalizationProvider>

        <InputField
          name="type"
          control={control}
          label="Type"
          select
          required
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: type ? bg : '#f5f5f5',
              transition: 'background-color 0.3s ease',
            },
          }}>
          {SERVICE_TYPES.map((typeOption: ServiceTypes) => {
            const { color } = getServiceTypeStyle(typeOption);
            return (
              <MenuItem key={typeOption} value={typeOption}>
                <span style={{ color, fontWeight: 'normal' }}>
                  {capitalize(typeOption)}
                </span>
              </MenuItem>
            );
          })}
        </InputField>
      </Box>
      <InputField
        name="serviceDescription"
        control={control}
        label="Service Description"
        placeholder="Enter service description"
      />
    </Section>
  );
};
