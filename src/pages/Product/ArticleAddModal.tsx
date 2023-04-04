import { DialogButton } from '@/components/DialogButton';
import { ADD_ARTICLES } from '@/data/mutations';
import { GET_ALL_LOCATIONS, GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';

import { DatePicker } from '@/components/Datepicker/Datepicker';
import { Location, UserProductPreferences } from '@/types';
import { useLazyQuery, useMutation } from '@apollo/client';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Autocomplete, Fab, Stack, TextField, TextFieldProps } from '@mui/material';
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
      id="date"
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
  const [quantity, setQuantity] = useState<string>('');
  const [expDate, setExpDate] = useState<Date | null>(null);

  const [locationList, setLocationList] = useState<Location[]>([]);

  const [saveArticles] = useMutation(ADD_ARTICLES, {
    refetchQueries: [
      {
        query: GET_PRODUCT_PREFERENCES_USER,
        variables: { idUser: 1, ean: userProductPref?.product.ean },
      },
    ],
  });

  const [getAllLocation] = useLazyQuery(GET_ALL_LOCATIONS, {
    onCompleted: (data) => {
      setLocationList(data.findAllLocations);
    },
  });

  useEffect(() => {
    userProductPref?.location && setSelectedLocation(userProductPref.location);
    if (open) {
      getAllLocation();
    }
  }, [userProductPref, open, getAllLocation]);

  const onSubmit = useCallback(() => {
    if (selectedLocation && quantity) {
      saveArticles({
        variables: {
          quantity: Number(quantity),
          idLocation: selectedLocation.id,
          eanProduct: userProductPref?.product.ean,
          idUser: 1,
          ...(expDate && { expirationDate: expDate }),
        },
      });
      setOpen(false);
    }
  }, [quantity, selectedLocation, expDate, saveArticles, userProductPref?.product.ean]);

  return (
    <>
      <Fab
        sx={{ color: 'common.white' }}
        size="small"
        aria-label="scan"
        variant="extended"
        color="primary"
        onClick={() => setOpen(true)}
        id="add_location"
      >
        <AddCircleRoundedIcon fontSize="small" sx={{ mr: 1 }} />
        emplacement
      </Fab>
      <DialogButton
        id="article_add"
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
            sx={{ width: '70%' }}
            renderInput={(params) => (
              <TextField {...params} label="Emplacement" size="small" variant="standard" />
            )}
          />

          <TextField
            label={userProductPref?.contentUnit.name}
            size="small"
            type="number"
            value={quantity || ''}
            sx={{ width: '70%' }}
            variant="standard"
            id="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{ sx: { fontSize: '0.9rem' } }}
          />
          <DatePicker
            selected={expDate}
            id="date"
            label="Date de péremption"
            onChange={(date) => setExpDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showYearDropdown
            small={false}
          />
        </Stack>
      </DialogButton>
    </>
  );
};
