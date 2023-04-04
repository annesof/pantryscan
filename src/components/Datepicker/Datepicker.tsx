/* eslint-disable react/display-name */
import { TextField } from '@mui/material';
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
});

const WhiteCalendarInput = forwardRef<HTMLInputElement, any>((props, ref) => (
  <WhiteTextField
    {...props}
    size="small"
    variant="standard"
    margin="none"
    ref={ref}
    InputLabelProps={{
      shrink: true,
    }}
    color="secondary"
    InputProps={{
      sx: {
        fontSize: '0.9rem',
        height: '1.3em',
        color: 'white',
        '& button>svg': { color: 'white', marginBottom: '10px', fontSize: '18px' },
      },
    }}
  />
));

const CalendarInput = forwardRef<HTMLInputElement, any>((props, ref) => (
  <TextField
    {...props}
    size="small"
    variant="standard"
    margin="none"
    ref={ref}
    InputLabelProps={{
      shrink: true,
    }}
  />
));

interface DatepickerProps extends ReactDatePickerProps {
  label: string;
  id: string;
  small: boolean;
}

export const DatePicker = (props: DatepickerProps) => {
  const { label, id, small, ...others } = props;
  return (
    <BaseDatePicker
      {...others}
      id={id}
      customInput={small ? <WhiteCalendarInput label={label} /> : <CalendarInput label={label} />}
      locale="fr"
    />
  );
};
