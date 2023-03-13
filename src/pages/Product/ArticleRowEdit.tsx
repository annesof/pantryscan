/* eslint-disable react/display-name */
import { UPDATE_ARTICLES } from '@/data/mutations';
import { GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';
import { useMutation } from '@apollo/client';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import MinusIcon from '@mui/icons-material/RemoveCircleRounded';
import { IconButton, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker, frFR, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getTime } from 'date-fns';
import { ChangeEvent, forwardRef, useCallback, useState } from 'react';

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

const CalendarInput = (props: TextFieldProps) => {
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
      InputProps={{
        ...props.InputProps,
        sx: { fontSize: '0.9rem', height: '1em', color: 'white' },
      }}
    />
  );
};

interface Props {
  id: number;
  ean: string;
  quantity: number;
  expirationDate?: number;
  setIdSelected: any;
  hidden: boolean;
}
export const ArticleRowEdit = forwardRef<HTMLDivElement, Props>(
  ({ id, ean, quantity, expirationDate, setIdSelected, hidden }: Props, ref) => {
    const [quantityLocal, setQuantityLocal] = useState<number>(quantity || 0);
    const [expDate, setExpDate] = useState<number | undefined>(expirationDate);
    const [updateArticle] = useMutation(UPDATE_ARTICLES, {
      refetchQueries: [
        {
          query: GET_PRODUCT_PREFERENCES_USER,
          variables: { idUser: 1, ean },
        },
      ],
    });

    const onSubmit = useCallback(() => {
      updateArticle({
        variables: {
          quantity: Number(quantityLocal),
          id: Number(id),
          expirationDate: expDate ? getTime(expDate) : null,
        },
      });
      setIdSelected(null);
    }, [quantityLocal, expDate, updateArticle, id, setIdSelected]);

    return (
      <Grid
        container
        ref={ref}
        xs={12}
        key={id}
        sx={{
          ...(hidden && { display: 'none' }),
          background: '#08B7C4',
          borderRadius: '10px',
          zIndex: 1000,
        }}
      >
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
                  // inputAdornment: <InputAdornment position="start">kg</InputAdornment>,
                }}
                slotProps={{
                  actionBar: { actions: ['accept', 'cancel', 'clear'] },
                }}
                value={expDate}
                onChange={(newValue) => {
                  setExpDate(newValue || undefined);
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
            onClick={onSubmit}
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
  },
);
