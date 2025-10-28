import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { SERVICE_TYPES } from 'constants/serviceTypes.ts';
import { capitalize } from 'helpers/stringHelpers.ts';
import { getServiceTypeStyle } from 'helpers/getServiceTypeColor.ts';
import { setModalActive } from 'store/slices/serviceLogsSlice.ts';
import { CustomDatePicker } from 'components/CustomDatePicker.tsx';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ArticleIcon from '@mui/icons-material/Article';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { InputField } from 'components/InputField.tsx';
import { Section } from 'components/Section.tsx';
import { ServiceTypes } from 'types/IServiceLog.ts';
import { Controller, Resolver, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceLogSchema } from 'validation/serviceLogSchema.ts';
import { useEffect } from 'react';

export const CustomModal = () => {
  const { modalActive } = useAppSelector(state => state.serviceLogs);

  const dispatch = useAppDispatch();

  type FormValues = {
    provider: string;
    serviceOrder: string;
    toggleButton: 'truck' | 'trailer';
    odometer: number | undefined;
    engineHours: number | undefined;
    dateIn: dayjs.Dayjs;
    dateOut: dayjs.Dayjs | undefined;
    type: 'planned' | 'unplanned' | 'emergency';
    serviceDescription: string | undefined;
  };

  const { control, watch, setValue, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(serviceLogSchema) as Resolver<FormValues>,
    defaultValues: {
      provider: '',
      serviceOrder: '',
      toggleButton: 'truck',
      odometer: undefined,
      engineHours: undefined,
      dateIn: dayjs(),
      dateOut: dayjs().add(1, 'day'),
      type: 'planned',
      serviceDescription: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data', data);
  };

  const onClose = () => {
    dispatch(setModalActive(false));
  };

  const dateIn = useWatch({ control, name: 'dateIn' });

  useEffect(() => {
    if (dateIn) {
      // update dateOut every time, when updated dateIn
      setValue('dateOut', dateIn.add(1, 'day'));
    }
  }, [dateIn, setValue]);

  const type = watch('type');
  const selectedType = (type || 'planned') as ServiceTypes;
  const { bg } = getServiceTypeStyle(selectedType);

  return (
    <Dialog open={modalActive} onClose={onClose} fullWidth maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          background: '#f5f5f5',
        }}>
        <DialogTitle>Edit Log</DialogTitle>
        <DialogActions>
          <Button type="submit" form="service-log-form" variant="contained">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Box>
      <DialogContent sx={{ background: '#f5f5f5' }}>
        <form id="service-log-form" onSubmit={handleSubmit(onSubmit)}>
          <Section
            title="1.Provider Details"
            icon={<PrivacyTipIcon color="primary" />}
            direction={'row'}>
            <InputField
              name="provider"
              control={control}
              label="Provider"
              placeholder="Provider"
              required
            />
            <InputField
              name="serviceOrder"
              control={control}
              label="Service Order"
              placeholder="Enter Service Order"
              required
            />
          </Section>

          <Section
            title="2.Equipment"
            icon={<DirectionsCarIcon color="primary" />}
            direction={'row'}
            action={
              <Controller
                name="toggleButton"
                control={control}
                render={({ field }) => (
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={field.value}
                    onChange={(_, value) => value && field.onChange(value)}
                    sx={{
                      '& .MuiToggleButton-root': {
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '20px',
                      },
                    }}>
                    <ToggleButton value="truck" sx={{ gap: 1 }}>
                      <FireTruckIcon sx={{ fontSize: 18 }} />
                      Truck
                    </ToggleButton>
                    <ToggleButton value="trailer" sx={{ gap: 1 }}>
                      <LocalShippingIcon sx={{ fontSize: 18 }} />
                      Trailer
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            }>
            <Controller
              name="toggleButton"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label={field.value === 'truck' ? 'Truck' : 'Trailer'}
                  value={field.value}
                  sx={{ flex: 2 }}
                  select
                  required>
                  <MenuItem value="truck">Truck</MenuItem>
                  <MenuItem value="trailer">Trailer</MenuItem>
                </InputField>
              )}
            />
            <InputField
              name="odometer"
              control={control}
              label="Odometer"
              placeholder="Enter miles"
              sx={{ flex: 1 }}
              type="number"
              endAdornment="ml"
            />
            <InputField
              name="engineHours"
              control={control}
              label="Engine Hours"
              placeholder="Enter hours"
              type="number"
              sx={{ flex: 1 }}
              endAdornment="h"
            />
          </Section>

          <Section
            title="3.Service details"
            icon={<ArticleIcon color="primary" />}
            direction={'column'}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru">
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
                      shouldDisabledDate={date => date.isBefore(dateIn, 'day')}
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
                        date.isBefore(dateIn, 'day') ||
                        date.isSame(dateIn, 'day')
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
                    backgroundColor: type ? bg : 'transparent',
                    transition: 'background-color 0.3s ease',
                  },
                }}>
                {SERVICE_TYPES.map(typeOption => {
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
        </form>
      </DialogContent>
    </Dialog>
  );
};
