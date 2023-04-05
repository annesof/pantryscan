import { DialogMenu } from '@/components/DialogMenu';
import { SWITCH_ARTICLE_LOCATION } from '@/data/mutations';
import { GET_ALL_LOCATIONS, GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';
import { Location } from '@/types';
import { useMutation } from '@apollo/client';

import { useQuery } from '@apollo/client';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
interface ArticleSwitchModalProps {
  onClose: () => void;
  ean: string;
  id: number;
}

export const ArticleSwitchModal = ({ onClose, ean, id }: ArticleSwitchModalProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>();
  const [quantity, setQuantity] = useState<number>();
  const [errorForm, setErrorForm] = useState(true);

  const { loading: loadingLocations, data: locations } = useQuery(GET_ALL_LOCATIONS);
  const locationList: Location[] = locations?.findAllLocations || [];

  const [switchArticleLocation] = useMutation(SWITCH_ARTICLE_LOCATION, {
    refetchQueries: [
      {
        query: GET_PRODUCT_PREFERENCES_USER,
        variables: { idUser: 1, ean },
      },
    ],
  });
  useEffect(() => {
    if (!selectedLocation && !quantity) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [selectedLocation, quantity]);

  const onSubmit = useCallback(() => {
    if (selectedLocation && quantity) {
      switchArticleLocation({
        variables: {
          quantity: Number(quantity),
          id: Number(id),
          idLocation: selectedLocation?.id,
        },
      });
    }
  }, [quantity, switchArticleLocation, id, selectedLocation]);

  return (
    <DialogMenu
      title="Changement d'emplacement"
      onCloseMenu={onClose}
      action={{
        name: 'Transfert',
        Icon: CompareArrowsIcon,
        label: 'ok',
        handleAction: onSubmit,
        disabled: errorForm,
      }}
    >
      <Stack spacing={3} sx={{ paddingTop: '5px' }}>
        <Autocomplete
          getOptionLabel={(option) => option.name || ''}
          id="location"
          onChange={(_, newValue) => {
            setSelectedLocation(newValue);
          }}
          options={locationList}
          loading={loadingLocations}
          size="small"
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Nouvel emplacement" />}
        />

        <TextField
          value={quantity}
          label="Quantité à transférer"
          size="small"
          type="number"
          sx={{ width: 250 }}
          inputProps={{ min: 0 }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setQuantity(event.target.value === '' ? 0 : Number(event.target.value));
          }}
        />
      </Stack>
    </DialogMenu>
  );
};
