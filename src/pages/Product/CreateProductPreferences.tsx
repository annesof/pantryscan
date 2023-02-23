import { Category, ContentUnit, Location } from '@/types';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Autocomplete, Button, Chip, Stack, TextField } from '@mui/material';
import { useCallback, useState } from 'react';

const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    findAllCategories {
      id
      name
    }
  }
`;

const GET_ALL_LOCATIONS = gql`
  query getAllLocations {
    findAllLocations {
      id
      name
    }
  }
`;

const GET_ALL_UNITS = gql`
  query getAllUnits {
    findAllUnits {
      id
      name
    }
  }
`;

/*const ADD_PREFERENCES = gql`
  mutation createUserProductSettings(
    $productEan: String!
    $locationId: String!
    $userId: Float!
    $contentUnitId: Float!
    $categoryIds: String!
  ) {
    createUserProductSettings(
      createUserProductSettingsInput: {
        productEan: $productEan
        locationId: $locationId
        userId: $userId
        contentUnitId: $contentUnitId
        categoryIds: $categoryIds
      }
    ) {
      id
    }
  }
`;*/

const ADD_PREFERENCES = gql`
  mutation createUserProductSettings(
    $productEan: String!
    $locationId: String!
    $userId: Float!
    $contentUnitId: Float!
    $categoryIds: String!
  ) {
    createUserProductSettings(
      createUserProductSettingsInput: {
        productEan: $productEan
        locationId: $locationId
        userId: $userId
        contentUnitId: $contentUnitId
        categoryIds: $categoryIds
      }
    ) {
      id
    }
  }
`;

export const CreateProductPreferences = ({ ean }: { ean: string }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>();
  const [selectedUnit, setSelectedUnit] = useState<ContentUnit | null>();

  const { loading: loadingCategories, data: categories } = useQuery(GET_ALL_CATEGORIES);
  const { loading: loadingLocations, data: locations } = useQuery(GET_ALL_LOCATIONS);
  const { loading: loadingUnits, data: units } = useQuery(GET_ALL_UNITS);

  const [savePreferences, { data, loading, error }] = useMutation(ADD_PREFERENCES);

  const categoryList: Category[] = categories?.findAllCategories || [];
  const locationList: Location[] = locations?.findAllLocations || [];
  const unitList: ContentUnit[] = units?.findAllUnits || [];

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
        options={categoryList}
        loading={loadingCategories}
        sx={{ width: 300 }}
        renderTags={(value, getTagProps) =>
          value.map((option, index: number) => (
            <Chip
              //variant="outlined"
              label={option.name}
              {...getTagProps({ index })}
              key={option.id}
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
        renderInput={(params) => <TextField {...params} label="Location" size="small" />}
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
      <Button onClick={() => buildAndSavePreferences()}>Save</Button>
    </Stack>
  );
};
