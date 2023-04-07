/* eslint-disable react/display-name */
import { UPDATE_ARTICLES } from '@/data/mutations';
import { GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';
import { useMutation } from '@apollo/client';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import MinusIcon from '@mui/icons-material/RemoveCircleRounded';
import { IconButton, IconButtonProps, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { getTime } from 'date-fns';
import { ChangeEvent, Dispatch, forwardRef, SetStateAction, useCallback, useState } from 'react';

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
  setIdSelected: Dispatch<SetStateAction<number | undefined>>;
  hidden: boolean;
}

const WhiteIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: 'white',
  '&:hover': { background: theme.palette.secondary.main },
  paddingTop: '15px',
  paddingRight: '5px',
  paddingLeft: '5px',
}));

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
      setIdSelected(undefined);
    }, [quantityLocal, expDate, updateArticle, id, setIdSelected]);

    return (
      <Grid
        container
        ref={ref}
        xs={12}
        key={id}
        sx={{
          ...(hidden && { display: 'none' }),
          background: (theme) => theme.palette.secondary.main,
          borderRadius: '10px',
          zIndex: 1000,
        }}
      >
        <Grid xs={4} sx={{ textAlign: 'right' }}>
          <Stack direction="row">
            <WhiteIconButton
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
            </WhiteIconButton>
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

            <WhiteIconButton
              size="small"
              id="addOne"
              onClick={() => setQuantityLocal((qty) => qty + 1)}
            >
              <AddIcon fontSize="inherit" />
            </WhiteIconButton>
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
            white
          />
        </Grid>
        <Grid xs={4} sx={{ textAlign: 'right' }}>
          <WhiteIconButton onClick={onSubmit}>
            <CheckIcon fontSize="inherit" />
          </WhiteIconButton>
          <WhiteIconButton onClick={() => setIdSelected(undefined)}>
            <ClearRoundedIcon fontSize="inherit" />
          </WhiteIconButton>
        </Grid>
      </Grid>
    );
  },
);
