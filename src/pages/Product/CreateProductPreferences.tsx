import { Chip } from '@/components/Chip';
import { GET_ALL_LOCATIONS, GET_ALL_UNITS } from '@/data/requests';
import { Category, ContentUnit, Location } from '@/types';
import { useQuery } from '@apollo/client';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

interface SaveProductPreferencesVariables {
  categoryIds: string;
  userId: number;
  locationId: string;
  productEan: string;
  contentUnitId: number;
}

interface CreateProductPreferencesProps {
  ean: string;
  savePreferences: ({ variables }: { variables: SaveProductPreferencesVariables }) => Promise<any>;
  categories: Category[];
}

export const CreateProductPreferences = ({
  ean,
  savePreferences,
  categories,
}: CreateProductPreferencesProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>();
  const [selectedUnit, setSelectedUnit] = useState<ContentUnit | null>();
  const [errorForm, setErrorForm] = useState(true);

  const { loading: loadingLocations, data: locations } = useQuery(GET_ALL_LOCATIONS);
  const { loading: loadingUnits, data: units } = useQuery(GET_ALL_UNITS);

  const locationList: Location[] = locations?.findAllLocations || [];
  const unitList: ContentUnit[] = units?.findAllUnits || [];

  useEffect(() => {
    if (selectedCategories.length !== 0 && selectedLocation && selectedUnit && ean) {
      setErrorForm(false);
    } else {
      setErrorForm(true);
    }
  }, [selectedCategories, selectedLocation, selectedUnit, ean]);

  const buildAndSavePreferences = useCallback(() => {
    if (selectedLocation && selectedUnit) {
      const categoryIds = selectedCategories.map((item) => item.id).join(',');
      savePreferences({
        variables: {
          categoryIds,
          userId: 1,
          locationId: selectedLocation.id,
          productEan: ean,
          contentUnitId: Number(selectedUnit.id),
        },
      });
    }
  }, [selectedCategories, selectedLocation, selectedUnit, ean, savePreferences]);

  return (
    <Stack spacing={3}>
      <Autocomplete
        onChange={(_, newValue) => {
          setSelectedCategories(newValue);
        }}
        multiple
        filterSelectedOptions
        getOptionLabel={(option) => option.name}
        id="categories"
        options={categories}
        disableCloseOnSelect
        //loading={loadingCategories}
        sx={{ width: 300 }}
        renderTags={(value, getTagProps) =>
          value.map((option, index: number) => (
            <Chip
              color={option.color}
              label={option.name}
              {...getTagProps({ index })}
              key={option.id}
              size="small"
            />
          ))
        }
        renderInput={(params) => <TextField {...params} label="Categories" size="small" />}
      />
      <Autocomplete
        getOptionLabel={(option) => option.name || ''}
        id="location"
        onChange={(_, newValue) => {
          setSelectedLocation(newValue);
        }}
        options={locationList}
        loading={loadingLocations}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Emplacement habituel" size="small" />
        )}
      />

      <Autocomplete
        getOptionLabel={(option) => option.name || ''}
        id="unit"
        onChange={(_, newValue) => {
          setSelectedUnit(newValue);
        }}
        options={unitList}
        loading={loadingUnits}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Unité" size="small" />}
      />
      <Button variant="contained" onClick={() => buildAndSavePreferences()} disabled={errorForm}>
        Suivant
      </Button>
    </Stack>
  );
};
