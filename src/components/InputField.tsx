import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Control, Controller } from 'react-hook-form';
import { ReactNode } from 'react';
import { sanitizeInputValue } from 'helpers/stringHelpers.ts';

interface InputFieldProps {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  showSearchIcon?: boolean;
  endAdornment?: 'ml' | 'h';
  required?: boolean;
  select?: boolean;
  type?: 'string' | 'number';
  children?: ReactNode;
  sx?: object;
}

export const InputField = ({
  name,
  control,
  label,
  placeholder,
  value,
  onChange,
  showSearchIcon = false,
  endAdornment,
  required = false,
  select = false,
  type = 'string', //default
  children,
  sx = {},
}: InputFieldProps) => {
  const renderTextField = (
    fieldValue: string | number,
    handleChange: (value: string) => void,
    errorMessage?: string,
  ) => {
    const isEmpty = !fieldValue || String(fieldValue).trim() === '';

    return (
      <TextField
        type={type === 'number' ? 'text' : type} // to make filtering
        select={select}
        label={label}
        placeholder={placeholder}
        value={fieldValue ?? ''}
        onChange={e => handleChange(e.target.value)}
        fullWidth
        required={required}
        size="small"
        variant="outlined"
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: 2,
            backgroundColor: isEmpty ? '#f5f5f5' : 'white',
            transition: 'background-color 0.2s ease',
          },
          '& .MuiFormHelperText-root': {
            mx: '8px',
          },
          ...sx,
        }}
        slotProps={{
          inputLabel: { sx: { fontSize: 14 } },
          input: {
            startAdornment: showSearchIcon && (
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

  //  # 1: if control + name → use Controller (React Hook Form)
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return renderTextField(
            field.value ?? '',
            value => field.onChange(sanitizeInputValue(value, type)),
            error?.message, // error message to TextField
          );
        }}
      />
    );
  }

  //  # 2: Regular usage without React Hook Form
  if (value !== undefined && onChange) {
    return renderTextField(value, onChange);
  }
};
