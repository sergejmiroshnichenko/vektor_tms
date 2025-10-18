import { Checkbox, FormControlLabel } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState } from 'react';
import { ServiceType } from 'types/IServiceLog.ts';
import { getServiceTypeColor } from 'helpers/getServiceTypeColor.ts';

export const ServiceTypeFilter = () => {
  const [selectedTypes, setSelectedTypes] = useState<ServiceType[]>([]);

  const handleChange = (type: ServiceType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  return (
    <div>
      <FormControlLabel
        slotProps={{ typography: { sx: { fontSize: 12 } } }}
        control={
          <Checkbox
            checked={selectedTypes.length === 3}
            onChange={() =>
              setSelectedTypes(
                selectedTypes.length === 3
                  ? []
                  : ['planned', 'unplanned', 'emergency'],
              )
            }
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            size="small"
          />
        }
        label="ALL"
      />
      {['planned', 'unplanned', 'emergency'].map(type => {
        const color = getServiceTypeColor(type);
        return (
          <FormControlLabel
            key={type}
            slotProps={{ typography: { sx: { fontSize: 12 } } }}
            control={
              <Checkbox
                checked={selectedTypes.includes(type)}
                onChange={() => handleChange(type)}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon sx={{ color }} />}
                size="small"
              />
            }
            label={type.toUpperCase()}
          />
        );
      })}
    </div>
  );
};
