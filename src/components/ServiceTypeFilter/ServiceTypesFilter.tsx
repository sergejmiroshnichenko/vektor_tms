import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState } from 'react';
import { ServiceTypes } from 'types/IServiceLog.ts';
import { getServiceTypeColor } from 'helpers/getServiceTypeColor.ts';
import { useAppSelector } from 'hooks/redux-hooks.ts';
import { SERVICE_TYPES } from 'constants/serviceTypes.ts';

export const ServiceTypesFilter = () => {
  const [selectedTypes, setSelectedTypes] = useState<ServiceTypes[]>([]);

  const { logs, page, pageSize } = useAppSelector(state => state.serviceLogs);

  const handleChange = (type: ServiceTypes) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const visibleRows = logs.slice(page * pageSize, (page + 1) * pageSize);

  const serviceTypeCounts = visibleRows.reduce<Record<string, number>>(
    (acc, { type }) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <div>
      <FormControlLabel
        slotProps={{ typography: { sx: { fontSize: 12 } } }}
        control={
          <Checkbox
            checked={selectedTypes.length === 3}
            onChange={() =>
              setSelectedTypes(selectedTypes.length === 3 ? [] : SERVICE_TYPES)
            }
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            size="small"
          />
        }
        label="ALL"
      />
      {SERVICE_TYPES.map(type => {
        const color = getServiceTypeColor(type);
        return (
          <>
            <FormControlLabel
              key={type}
              slotProps={{ typography: { sx: { fontSize: 14 } } }}
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
            <Typography
              component="span"
              sx={{
                fontSize: 10,
                background: 'beige',
                borderRadius: '50%',
                padding: 0.5,
                marginRight: 1,
              }}>
              {serviceTypeCounts[type]}
            </Typography>
          </>
        );
      })}
    </div>
  );
};
