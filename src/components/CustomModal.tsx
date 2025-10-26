import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { SERVICE_TYPES } from 'constants/serviceTypes.ts';
import { capitalize } from 'helpers/stringHelpers.ts';
import { useEffect, useState } from 'react';
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

export const CustomModal = () => {
  const { modalActive } = useAppSelector(state => state.serviceLogs);

  const [type, setType] = useState('');
  const [dateIn, setDateIn] = useState(dayjs());
  const [dateOut, setDateOut] = useState(dayjs().add(1, 'day'));
  const [odometer, setOdometer] = useState('');
  const [engineHours, setEngineHours] = useState('');
  const [description, setDescription] = useState('');
  const [toggleButton, setToggleButton] = useState('truck');
  const [provider, setProvider] = useState('');
  const [serviceOrder, setServiceOrder] = useState('');

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModalActive(false));
  };

  useEffect(() => {
    setDateOut(dateIn.add(1, 'day'));
  }, [dateIn]);

  return (
    <Dialog open={modalActive} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>Edit Log</DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Box>
      <DialogContent>
        <Section
          title="1.Provider Details"
          icon={<PrivacyTipIcon color="primary" />}
          direction={'row'}>
          <InputField
            label="Provider"
            placeholder="Provider"
            required
            value={provider}
            onChange={setProvider}
          />
          <InputField
            label="Service Order"
            placeholder="Enter Service Order"
            required
            value={serviceOrder}
            onChange={setServiceOrder}
          />
        </Section>

        <Section
          title="2.Equipment"
          icon={<DirectionsCarIcon color="primary" />}
          direction={'row'}
          action={
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={toggleButton}
              onChange={(_, value) => value && setToggleButton(value)}
              sx={{
                mb: 2,
                '& .MuiToggleButton-root': {
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 3,
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
          }>
          <InputField
            label={toggleButton}
            value={toggleButton}
            sx={{ flex: 2 }}
            select
            required
            onChange={setToggleButton}>
            <MenuItem value="truck">Truck</MenuItem>
            <MenuItem value="trailer">Trailer</MenuItem>
          </InputField>
          <InputField
            label="Odometer"
            placeholder="Enter miles"
            value={odometer}
            onChange={setOdometer}
            sx={{ flex: 1 }}
            endAdornment={'ml'}
          />
          <InputField
            label="Engine Hours"
            placeholder="Enter hours"
            value={engineHours}
            onChange={setEngineHours}
            sx={{ flex: 1 }}
            endAdornment={'h'}
          />
        </Section>

        <Section
          title="3.Service details"
          icon={<ArticleIcon color="primary" />}
          direction={'column'}>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <CustomDatePicker
                label="Date in"
                value={dateIn}
                required
                defaultToday={true}
                onChange={newValue => setDateIn(newValue || dayjs())}
                shouldDisabledDate={date => date.isBefore(dateIn, 'day')}
              />
              <CustomDatePicker
                label="Date out"
                value={dateOut}
                onChange={newValue =>
                  setDateOut(newValue ?? dateIn.add(1, 'day'))
                }
                shouldDisabledDate={date =>
                  date.isBefore(dateIn, 'day') || date.isSame(dateIn, 'day')
                }
              />
            </LocalizationProvider>
            <TextField
              select
              required
              fullWidth
              label="Type"
              defaultValue="Planned"
              value={type}
              onChange={e => setType(e.target.value)}>
              {SERVICE_TYPES.map(type => {
                return (
                  <MenuItem key={type} value={type}>
                    {capitalize(type)}
                  </MenuItem>
                );
              })}
            </TextField>
          </Box>
          <InputField
            label="Service Description"
            placeholder="Enter service description"
            value={description}
            onChange={setDescription}
          />
        </Section>
      </DialogContent>
    </Dialog>
  );
};
