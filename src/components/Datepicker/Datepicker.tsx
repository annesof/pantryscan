/* eslint-disable react/display-name */
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { forwardRef } from 'react';

import fr from 'date-fns/locale/fr';
import BaseDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

registerLocale('fr', fr);

const WhiteTextField = styled(TextField)({
  '& label': {
    color: 'rgba(255,255,255,0.8)',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-input': {
    color: 'white',
  },
  '& svg': { color: 'white', marginBottom: '5px', fontSize: '18px' },
});

interface DatepickerProps extends ReactDatePickerProps {
  label?: string;
  id: string;
  small?: boolean;
  width?: string;
  white?: boolean;
}
const WhiteCalendarInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <WhiteTextField
    {...props}
    size="small"
    variant="standard"
    margin="none"
    ref={ref}
    InputLabelProps={{
      shrink: true,
    }}
    InputProps={{
      sx: props.sx,
      endAdornment: (
        <InputAdornment position="end">
          <CalendarMonthIcon />
        </InputAdornment>
      ),
    }}
  />
));

const CalendarInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField
    {...props}
    size="small"
    variant="standard"
    margin="none"
    ref={ref}
    sx={props.sx}
    InputLabelProps={{
      shrink: true,
    }}
    InputProps={{
      readOnly: true,
      endAdornment: (
        <InputAdornment position="end">
          <CalendarMonthIcon />
        </InputAdornment>
      ),
    }}
  />
));

export const DatePicker = ({
  label,
  id,
  small,
  width,
  white = false,
  ...others
}: DatepickerProps) => {
  const sx = small ? { fontSize: '0.9rem', height: '1.3em', width } : { width };
  const InputComponent = white ? WhiteCalendarInput : CalendarInput;
  return (
    <BaseDatePicker
      {...others}
      id={id}
      customInput={<InputComponent label={label} sx={sx} />}
      locale="fr"
    />
  );
};
