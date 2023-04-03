/* eslint-disable react/display-name */
import { Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { forwardRef } from 'react';

import fr from 'date-fns/locale/fr';
import BaseDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

registerLocale('fr', fr);

const WhiteTextField = styled(TextField)({
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

const CalendarInput = forwardRef<HTMLInputElement, any>((props, ref) => (
  <WhiteTextField
    {...props}
    size="small"
    variant="standard"
    margin="none"
    ref={ref}
    InputLabelProps={{
      shrink: true,
    }}
    //id="expirationDate"
    color="secondary"
    InputProps={{
      sx: {
        fontSize: '0.9rem',
        height: '1em',
        color: 'white',
        '& button>svg': { color: 'white', marginBottom: '10px', fontSize: '18px' },
      },
    }}
  />
));

interface DatepickerProps extends ReactDatePickerProps {
  label: string;
  id: string;
}

export const DatePicker = (props: DatepickerProps) => {
  const { label, id, ...others } = props;
  return (
    <Stack direction="column" sx={{ textAlign: 'left', color: 'white' }}>
      <Typography variant="caption">{label}</Typography>
      <BaseDatePicker {...others} id={id} customInput={<CalendarInput />} locale="fr" />
    </Stack>
  );
};
