/* eslint-disable react/display-name */
import { UPDATE_ARTICLES } from '@/data/mutations';
import { GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';
import { useMutation } from '@apollo/client';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import MinusIcon from '@mui/icons-material/RemoveCircleRounded';
import { IconButton, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { getTime } from 'date-fns';
import { ChangeEvent, forwardRef, useCallback, useState } from 'react';

import { DatePicker } from '@/components/Datepicker/Datepicker';

const WhiteTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& label': {
    color: 'rgba(255,255,255,0.8)',
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

interface Props {
  id: number;
  ean: string;
  quantity: number;
  expirationDate?: number;
  setIdSelected: any;
  hidden: boolean;
}

const buttonStyle = {
  background: '#08B7C4',
  color: 'white',
  '&:hover': { background: '#08B7C4' },
  paddingTop: '15px',
};
export const ArticleRowEdit = forwardRef<HTMLDivElement, Props>(
  ({ id, ean, quantity, expirationDate, setIdSelected, hidden }: Props, ref) => {
    const [quantityLocal, setQuantityLocal] = useState<number>(quantity || 0);
    const [expDate, setExpDate] = useState<Date | null>(
      expirationDate ? new Date(expirationDate) : null,
    );
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
          <Stack direction="row">
            <IconButton
              sx={{
                background: '#08B7C4',
                color: 'white',
                '&:hover': { background: '#08B7C4' },
                paddingTop: '15px',
              }}
              size="small"
              id="substractOne"
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
              label="Qté"
              InputProps={{ sx: { fontSize: '0.9rem', height: '1.3em', color: 'white' } }}
              size="small"
              id="quantity_editable"
              variant="standard"
              inputProps={{ min: 0, inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setQuantityLocal(event.target.value === '' ? 0 : Number(event.target.value));
              }}
            />

            <IconButton
              sx={{
                background: '#08B7C4',
                color: 'white',
                '&:hover': { background: '#08B7C4' },
                paddingTop: '15px',
              }}
              size="small"
              id="addOne"
              onClick={() => setQuantityLocal((qty) => qty + 1)}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid xs={4} sx={{ textAlign: 'right' }}>
          <DatePicker
            selected={expDate}
            id="expirationDate"
            label="Expire"
            onChange={(date) => setExpDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showYearDropdown
            small
          />
        </Grid>
        <Grid xs={4} sx={{ textAlign: 'right' }}>
          <IconButton sx={{ ...buttonStyle }} size="small" onClick={onSubmit}>
            <CheckIcon fontSize="inherit" />
          </IconButton>
          <IconButton sx={{ ...buttonStyle }} size="small" onClick={() => setIdSelected(undefined)}>
            <ClearRoundedIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    );
  },
);
