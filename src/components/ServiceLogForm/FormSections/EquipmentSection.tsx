import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { InputField } from 'components/InputField.tsx';
import { Section } from 'components/Section.tsx';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';

interface EquipmentSectionProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}

export const EquipmentSection = ({
  control,
  setValue,
  watch,
}: EquipmentSectionProps) => {
  const toggleValue = watch('equipment');

  return (
    <Section
      title="2.Equipment"
      icon={<DirectionsCarIcon color="primary" />}
      direction="row"
      action={
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={toggleValue}
          onChange={(_, value) =>
            value &&
            // ToggleButtonGroup synchronise with InputField through setValue
            setValue('equipment', value, { shouldValidate: true })
          }
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
      }>
      <InputField
        name="equipment"
        control={control}
        label={
          'Equipment'
          // toggleValue
          // ? toggleValue === 'truck'
          //   ? 'Truck'
          //   : 'Trailer'
          // : 'Select type'
        }
        value={toggleValue}
        select
        required
        sx={{ flex: 2 }}>
        <MenuItem value="truck">Truck</MenuItem>
        <MenuItem value="trailer">Trailer</MenuItem>
      </InputField>

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
  );
};
