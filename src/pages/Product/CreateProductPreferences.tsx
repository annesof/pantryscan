import { Chip } from '@/components/Chip';
import { Select } from '@/components/Select';
import { GET_ALL_LOCATIONS, GET_ALL_UNITS } from '@/data/queries';
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
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [errorForm, setErrorForm] = useState(true);

  const { data: locations } = useQuery(GET_ALL_LOCATIONS);
  const { data: units } = useQuery(GET_ALL_UNITS);

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
          locationId: selectedLocation,
          productEan: ean,
          contentUnitId: Number(selectedUnit),
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
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            size="small"
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      <Select
        id="location"
        onChange={(event) => {
          setSelectedLocation(event.target.value as string);
        }}
        options={locationList}
        sx={{ width: 300 }}
        label="Emplacement habituel"
      />

      <Select
        id="unit"
        onChange={(event) => {
          setSelectedUnit(event.target.value as string);
        }}
        options={unitList}
        sx={{ width: 300 }}
        label="Type de contenant"
      />

      <Button
        id="next"
        variant="contained"
        onClick={() => buildAndSavePreferences()}
        disabled={errorForm}
      >
        Suivant
      </Button>
    </Stack>
  );
};
