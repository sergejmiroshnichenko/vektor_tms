import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { ServiceTypes } from 'types/IServiceLog.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { SERVICE_TYPES } from 'constants/serviceTypes.ts';
import { setSelectedServiceTypes } from 'store/slices/serviceLogsSlice.ts';
import { useMemo } from 'react';
import { getPaginatedFilteredLogs } from 'helpers/getPaginatedFilteredLogs.ts';
import { getServiceTypeStyle } from 'helpers/getServiceTypeColor.ts';
import { radius } from 'theme/constants.ts';

export const ServiceTypesFilter = () => {
  const {
    logs,
    page,
    pageSize,
    selectedServiceTypes,
    startDate,
    endDate,
    searchQuery,
  } = useAppSelector(state => state.serviceLogs);

  const dispatch = useAppDispatch();

  const filteredPaginatedLogs = useMemo(() => {
    return getPaginatedFilteredLogs({
      logs,
      page,
      pageSize,
      selectedServiceTypes,
      endDate,
      startDate,
      searchQuery,
    });
  }, [
    logs,
    page,
    pageSize,
    selectedServiceTypes,
    startDate,
    endDate,
    searchQuery,
  ]);

  const initial = {} as Record<ServiceTypes, number>;
  for (const type of SERVICE_TYPES) {
    initial[type] = 0;
  }

  const serviceTypeCounts = filteredPaginatedLogs.reduce<
    Record<ServiceTypes, number>
  >((acc, { type }) => {
    acc[type] += 1;
    return acc;
  }, initial);

  const toggleServiceTypes = (type: ServiceTypes) => {
    let newSelected: ServiceTypes[];
    if (selectedServiceTypes.includes(type)) {
      // removing a type
      newSelected = selectedServiceTypes.filter(t => t !== type);
    } else {
      // add type
      newSelected = [...selectedServiceTypes, type];
    }
    dispatch(setSelectedServiceTypes(newSelected));
  };

  const isAllSelected = selectedServiceTypes.length === SERVICE_TYPES.length;

  return (
    <Box display="flex">
      <FormControlLabel
        slotProps={{ typography: { sx: { fontSize: 12 } } }}
        control={
          <Checkbox
            checked={isAllSelected}
            onChange={() => {
              if (!isAllSelected) {
                dispatch(setSelectedServiceTypes([...SERVICE_TYPES]));
              }
            }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            size="small"
          />
        }
        label="ALL"
      />
      {SERVICE_TYPES.map(type => {
        const color = getServiceTypeStyle(type);

        return (
          <Box key={type}>
            <FormControlLabel
              slotProps={{ typography: { sx: { fontSize: 14 } } }}
              control={
                <Checkbox
                  checked={selectedServiceTypes.includes(type)}
                  onChange={() => toggleServiceTypes(type)}
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
                borderRadius: radius.circle,
                padding: 0.5,
                marginRight: 1,
              }}>
              {serviceTypeCounts[type]}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
