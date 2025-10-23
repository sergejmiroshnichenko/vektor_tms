import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  icon?: 'search' | 'none';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  sx?: object;
}

export const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  icon = 'none',
  size = 'small',
  fullWidth = false,
  disabled = false,
  required = false,
  sx = {},
}: InputFieldProps) => {
  const isEmpty = !value || String(value).trim() === '';
  return (
    <TextField
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      type={type}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      variant="outlined"
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: 2,
          backgroundColor: isEmpty ? '#f5f5f5' : 'white',
          transition: 'background-color 0.2s ease',
        },
        // '& .MuiOutlinedInput-notchedOutline': {
        //   borderColor: '#ccc',
        // },
        // '&:hover .MuiOutlinedInput-notchedOutline': {
        //   borderColor: '#999',
        // },
        ...sx,
      }}
      slotProps={{
        input: {
          startAdornment:
            icon === 'search' ? (
              <InputAdornment position="start">
                <SearchIcon
                  fontSize="small"
                  sx={{ color: isEmpty ? '#9e9e9e' : '#616161' }}
                />
              </InputAdornment>
            ) : undefined,
        },
      }}
    />
  );
};
