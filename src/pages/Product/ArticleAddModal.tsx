import { DialogButton } from '@/components/DialogButton';
import { ADD_ARTICLES } from '@/data/mutations';
import { GET_ALL_LOCATIONS, GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';

import { Location, UserProductPreferences } from '@/types';
import { useMutation, useQuery } from '@apollo/client';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Autocomplete, Fab, Stack, TextField, TextFieldProps } from '@mui/material';
import { DatePicker, frFR, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fromUnixTime } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  userProductPref?: UserProductPreferences;
}

const CalendarInput = function BrowserInput(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      size="small"
      variant="standard"
      margin="none"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{ sx: { fontSize: '0.9rem' } }}
    />
  );
};

export const ArticleAddModal = ({ userProductPref }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    userProductPref?.location || null,
  );
  const [quantity, setQuantity] = useState<string>();
  const [expDate, setExpDate] = useState<number | null>(null);
  const { loading: loadingLocations, data: locations } = useQuery(GET_ALL_LOCATIONS);
  const locationList: Location[] = locations?.findAllLocations || [];

  const [saveArticles] = useMutation(ADD_ARTICLES, {
    refetchQueries: [
      {
        query: GET_PRODUCT_PREFERENCES_USER,
        variables: { idUser: 1, ean: userProductPref?.product.ean },
      },
    ],
  });

  useEffect(() => {
    userProductPref?.location && setSelectedLocation(userProductPref.location);
  }, [userProductPref]);

  const onSubmit = useCallback(() => {
    if (selectedLocation && quantity) {
      saveArticles({
        variables: {
          quantity: Number(quantity),
          idLocation: selectedLocation.id,
          eanProduct: userProductPref?.product.ean,
          ...(expDate && { expirationDate: fromUnixTime(expDate / 1000) }),
        },
      });
      setOpen(false);
    }
  }, [quantity, selectedLocation, expDate, saveArticles, userProductPref?.product.ean]);

  return (
    <>
      <Fab sx={{ color: 'common.white' }} aria-label="scan" color="primary">
        <AddCircleRoundedIcon fontSize="large" onClick={() => setOpen(true)} />
      </Fab>
      <DialogButton
        title="Ajout d'un article"
        open={open}
        setOpen={setOpen}
        action={{
          name: 'test',
          label: 'ok',
          handleAction: onSubmit,
          disabled: !quantity || selectedLocation === null,
        }}
      >
        <Stack spacing={3}>
          <Autocomplete
            getOptionLabel={(option) => option.name || ''}
            id="location"
            onChange={(_, newValue) => {
              setSelectedLocation(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={locationList}
            value={selectedLocation}
            loading={loadingLocations}
            sx={{ width: '70%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Emplacement"
                size="small"
                variant="standard"
                //InputProps={{ sx: { fontSize: '0.9rem' } }}
              />
            )}
          />

          <TextField
            label={userProductPref?.contentUnit.name}
            size="small"
            type="number"
            value={quantity}
            sx={{ width: '70%' }}
            variant="standard"
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{ sx: { fontSize: '0.9rem' } }}
          />

          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <DatePicker
              views={['month', 'year']}
              format="MM/yyyy"
              label="Date de péremption"
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
      </DialogButton>
    </>
  );
};
