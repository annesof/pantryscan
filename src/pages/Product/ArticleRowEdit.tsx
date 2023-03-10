import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import MinusIcon from '@mui/icons-material/RemoveCircleRounded';
import { IconButton, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker, frFR, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fromUnixTime } from 'date-fns';
import { ChangeEvent, useState } from 'react';

const WhiteTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
});

const CalendarInput = function BrowserInput(props: TextFieldProps) {
  return (
    <WhiteTextField
      {...props}
      size="small"
      variant="standard"
      margin="none"
      InputLabelProps={{
        shrink: true,
      }}
      color="secondary"
      InputProps={{ sx: { fontSize: '0.9rem', height: '1em', color: 'white' } }}
    />
  );
};

interface Props {
  id: number;
  quantity: number;
  expirationDate?: number;
  setIdSelected: any;
}
export const ArticleRowEdit = ({ id, quantity, expirationDate, setIdSelected }: Props) => {
  const [quantityLocal, setQuantityLocal] = useState<number>(quantity || 0);
  const [expDate, setExpDate] = useState<Date | null>(
    expirationDate ? fromUnixTime(expirationDate / 1000) : null,
  );
  return (
    <Grid container xs={12} key={id}>
      <Grid xs={4} sx={{ textAlign: 'right' }}>
        <Stack direction="column" sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="caption">Quantité</Typography>
          <Stack direction="row">
            <IconButton
              sx={{
                background: '#08B7C4',
                color: 'white',
                '&:hover': { background: '#08B7C4' },
                paddingTop: 0,
                verticalAlign: 'top',
              }}
              size="small"
              onClick={() =>
                setQuantityLocal((qty) => {
                  if (!qty || qty === 0) return 0;
                  return qty - 1;
                })
              }
            >
              <MinusIcon fontSize="inherit" />
            </IconButton>
            <WhiteTextField
              value={quantityLocal}
              color="secondary"
              sx={{ width: '25px' }}
              InputProps={{ sx: { fontSize: '0.9rem', height: '1em', color: 'white' } }}
              size="small"
              type="number"
              variant="standard"
              inputProps={{ min: 0 }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setQuantityLocal(event.target.value === '' ? 0 : Number(event.target.value));
              }}
            />

            <IconButton
              sx={{
                background: '#08B7C4',
                color: 'white',
                '&:hover': { background: '#08B7C4' },
                paddingTop: 0,
                verticalAlign: 'top',
              }}
              size="small"
              onClick={() => setQuantityLocal((qty) => qty + 1)}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Stack>
      </Grid>

      <Grid xs={4} sx={{ textAlign: 'right' }}>
        <Stack direction="column" sx={{ textAlign: 'left', color: 'white' }}>
          <Typography variant="caption">Expire</Typography>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <DatePicker
              views={['month', 'year']}
              format="MM/yyyy"
              slots={{
                textField: CalendarInput,
              }}
              slotProps={{
                actionBar: { actions: ['accept', 'cancel', 'clear'] },
              }}
              value={expDate}
              onChange={(newValue) => {
                setExpDate(newValue);
              }}
              onError={() => console.log('pb')}
            />
          </LocalizationProvider>
        </Stack>
      </Grid>

      <Grid xs={4} sx={{ textAlign: 'right' }}>
        <IconButton
          sx={{
            background: '#08B7C4',
            color: 'white',
            '&:hover': { background: '#08B7C4' },
          }}
          size="small"
          onClick={() => setIdSelected(undefined)}
        >
          <CheckIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          sx={{
            background: '#08B7C4',
            color: 'white',
            '&:hover': { background: '#08B7C4' },
          }}
          size="small"
          onClick={() => setIdSelected(undefined)}
        >
          <ClearRoundedIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
