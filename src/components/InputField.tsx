import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ReactNode } from 'react';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  icon?: 'search' | 'none';
  endAdornment?: 'ml' | 'h';
  required?: boolean;
  select?: boolean;
  children?: ReactNode;
  sx?: object;
}

export const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  icon = 'none',
  endAdornment,
  required = false,
  select = false,
  children,
  sx = {},
}: InputFieldProps) => {
  const isEmpty = !value || String(value).trim() === '';

  return (
    <TextField
      select={select}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      fullWidth
      required={required}
      size="small"
      variant="outlined"
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: 2,
          backgroundColor: isEmpty ? '#f5f5f5' : 'white',
          transition: 'background-color 0.2s ease',
        },
        ...sx,
      }}
      slotProps={{
        inputLabel: { sx: { fontSize: 14 } },
        input: {
          startAdornment: icon === 'search' && (
            <InputAdornment position="start">
              <SearchIcon
                fontSize="small"
                sx={{ color: isEmpty ? '#9e9e9e' : '#616161' }}
              />
            </InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
        },
      }}>
      {select && children}
    </TextField>
  );
};
