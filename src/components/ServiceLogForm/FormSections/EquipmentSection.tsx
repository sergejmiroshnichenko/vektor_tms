import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { InputField } from 'components/InputField.tsx';
import { Section } from 'components/Section.tsx';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';
import { useRef } from 'react';

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

  const equipmentInputRef = useRef<HTMLInputElement | null>(null);

  const getEquipmentType = (equipmentType: string, text?: string) => {
    if (equipmentType?.startsWith('Truck')) return 'Truck';
    if (equipmentType?.startsWith('Trailer')) return 'Trailer';
    return text;
  };

  return (
    <Section
      title="2.Equipment"
      icon={<DirectionsCarIcon color="primary" />}
      direction="row"
      action={
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={getEquipmentType(toggleValue)}
          onChange={(_, selected) => {
            if (selected) {
              setValue(
                'equipment',
                toggleValue.startsWith(selected) ? toggleValue : `${selected}-`,
                {
                  shouldValidate: true,
                },
              );
              setTimeout(() => {
                equipmentInputRef.current?.focus();
              }, 0);
            }
          }}
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              height: '20px',
            },
          }}>
          <ToggleButton value="Truck" sx={{ gap: 1 }}>
            <FireTruckIcon sx={{ fontSize: 18 }} />
            Truck
          </ToggleButton>
          <ToggleButton value="Trailer" sx={{ gap: 1 }}>
            <LocalShippingIcon sx={{ fontSize: 18 }} />
            Trailer
          </ToggleButton>
        </ToggleButtonGroup>
      }>
      <InputField
        name="equipment"
        control={control}
        inputRef={equipmentInputRef}
        label={getEquipmentType(toggleValue, 'Select type')}
        placeholder={getEquipmentType(toggleValue, 'Enter equipment')}
        value={toggleValue}
        required
        sx={{ flex: 2 }}
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
  );
};
