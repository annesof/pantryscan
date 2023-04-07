import { DialogButton } from '@/components/DialogButton';
import { ADD_ARTICLES } from '@/data/mutations';
import { GET_ALL_LOCATIONS, GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';

import { DatePicker } from '@/components/Datepicker/Datepicker';
import { Select } from '@/components/Select';
import { Location, UserProductPreferences } from '@/types';
import { useLazyQuery, useMutation } from '@apollo/client';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Fab, Stack, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  userProductPref?: UserProductPreferences;
}

export const ArticleAddModal = ({ userProductPref }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(userProductPref?.location.id);
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
    userProductPref?.location && setSelectedLocation(userProductPref.location.id);
    if (open) {
      getAllLocation();
    }
  }, [userProductPref, open, getAllLocation]);

  const onClose = useCallback(() => {
    setQuantity('');
    setExpDate(null);
    setOpen(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (selectedLocation && quantity) {
      saveArticles({
        variables: {
          quantity: Number(quantity),
          idLocation: selectedLocation,
          eanProduct: userProductPref?.product.ean,
          idUser: 1,
          ...(expDate && { expirationDate: expDate }),
        },
      });
      onClose();
    }
  }, [quantity, selectedLocation, expDate, saveArticles, userProductPref?.product.ean, onClose]);

  return (
    <>
      <Fab
        sx={{ color: 'common.white', fontSize: '12px' }}
        size="small"
        aria-label="scan"
        variant="extended"
        color="primary"
        onClick={() => setOpen(true)}
        id="add_location"
      >
        <AddCircleRoundedIcon fontSize="small" sx={{ mr: 1, fontSize: '16px' }} />
        emplacement
      </Fab>
      <DialogButton
        id="article_add"
        title="Ajout d'un article"
        open={open}
        onClose={onClose}
        action={{
          label: 'ok',
          handleAction: onSubmit,
          disabled: !quantity || selectedLocation === null,
        }}
      >
        <Stack spacing={3}>
          <Select
            id="location"
            onChange={(event) => {
              setSelectedLocation(event.target.value as string);
            }}
            options={locationList}
            value={selectedLocation}
            sx={{ width: '70%' }}
            label="Emplacement"
          />

          <TextField
            label={userProductPref?.contentUnit.name}
            size="small"
            type="number"
            value={quantity || ''}
            sx={{ width: '70%' }}
            variant="standard"
            id="quantity"
            InputLabelProps={{
              shrink: true,
            }}
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
            width="70%"
            small={false}
          />
        </Stack>
      </DialogButton>
    </>
  );
};
