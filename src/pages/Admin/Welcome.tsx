import { Block } from '@/components/Block';
import { Chip } from '@/components/Chip';
import { Select } from '@/components/Select';
import { Title } from '@/components/Title';
import { FullSizeDecenteredFlexBox } from '@/components/styled';
import { ADD_PERSONAL_PRODUCT_PREFERENCES } from '@/data/mutations';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_LOCATIONS,
  GET_ALL_PERSONAL_PRODUCT,
  GET_ALL_UNITS,
} from '@/data/queries';
import { Category, ContentUnit, Location, Product } from '@/types';
import { useMutation, useQuery } from '@apollo/client';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { PersonalProductList } from './PersonalProductList';
import { Wheel } from './Wheel';

function Welcome() {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<Category[] | undefined>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<number | undefined>();
  const [errorForm, setErrorForm] = useState(true);

  const { data: locations } = useQuery(GET_ALL_LOCATIONS);
  const { data: units } = useQuery(GET_ALL_UNITS);
  const { data: categories } = useQuery(GET_ALL_CATEGORIES);
  const { data: products } = useQuery(GET_ALL_PERSONAL_PRODUCT, {
    variables: { idUser: 1 },
  });

  const locationList: Location[] = locations?.findAllLocations || [];
  const unitList: ContentUnit[] = units?.findAllUnits || [];
  const categoryList: Category[] = categories?.findAllCategories || [];
  const productList: Product[] = products?.findPersonalProducts || [];

  useEffect(() => {
    if (selectedCategories?.length !== 0 && selectedLocation && selectedUnit && name) {
      setErrorForm(false);
    } else {
      setErrorForm(true);
    }
  }, [selectedCategories, selectedLocation, selectedUnit, name]);

  const [saveProduct] = useMutation(ADD_PERSONAL_PRODUCT_PREFERENCES, {
    onCompleted: () => {
      setName('');
      setImage('');
      setSelectedCategories(undefined);
      setSelectedLocation(undefined);
      setSelectedUnit(undefined);
    },
    refetchQueries: [
      {
        query: GET_ALL_PERSONAL_PRODUCT,
        variables: { idUser: 1 },
      },
    ],
  });

  const onSubmit = useCallback(() => {
    if (name && image && selectedLocation && selectedUnit && selectedCategories) {
      const categoryIds = selectedCategories?.map((item) => item.id).join(',');

      saveProduct({
        variables: {
          categoryIds,
          userId: 1,
          locationId: selectedLocation,
          contentUnitId: Number(selectedUnit),
          imageSmallUrl: image,
          productEan: `1${selectedType}${name
            .split(' ')
            .map((item: string) =>
              item
                .replace('(', '')
                .replace(')', '')
                .replace('DE', '2')
                .substring(0, 3)
                .toUpperCase(),
            )
            .join('')}`,
          name: name,
        },
      });
    }
  }, [name, saveProduct, image, selectedLocation, selectedUnit, selectedCategories, selectedType]);

  return (
    <>
      <FullSizeDecenteredFlexBox flexDirection="column" sx={{ width: '85%', marginTop: 0 }}>
        <Block>
          <Title>Ajout d un produit</Title>
          <Stack spacing={1}>
            <TextField
              label="Nom"
              size="small"
              value={name}
              sx={{ width: '70%' }}
              variant="standard"
              id="name"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ sx: { fontSize: '0.9rem' } }}
            />
            <TextField
              label="Photo"
              size="small"
              value={image}
              sx={{ width: '70%' }}
              variant="standard"
              id="image"
              multiline
              maxRows={4}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setImage(e.target.value)}
              InputProps={{ sx: { fontSize: '0.9rem' } }}
            />
            <Autocomplete
              onChange={(_, newValue) => {
                setSelectedCategories(newValue);
              }}
              multiple
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              id="categories"
              options={categoryList}
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
                  label="Labels"
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

            <Select
              id="type"
              onChange={(event) => {
                setSelectedType(event.target.value as number);
              }}
              options={[
                { id: 1, name: 'Porc' },
                { id: 2, name: 'Boeuf' },
                { id: 3, name: 'Veau' },
                { id: 4, name: 'Saumon' },
                { id: 5, name: 'Canard' },
                { id: 6, name: 'Poulet' },
                { id: 8, name: 'Dinde' },
                { id: 7, name: 'Lapin' },
                { id: 9, name: 'Colin' },
                { id: 10, name: 'Cabillaud' },
              ]}
              sx={{ width: 300 }}
              label="Type"
            />

            <Stack direction="row" spacing={2} sx={{ paddingTop: '10px' }}>
              <Button
                sx={{ color: 'common.white' }}
                variant="contained"
                autoFocus
                disabled={errorForm}
                onClick={onSubmit}
              >
                OK
              </Button>
              <Button variant="outlined">Annuler</Button>
            </Stack>
          </Stack>
          <img src={image} width="100px" />
        </Block>

        <Block>
          <Title>Produits</Title>
          <PersonalProductList rows={productList} />
        </Block>
        <Wheel rows={productList} />
      </FullSizeDecenteredFlexBox>
    </>
  );
}

export default Welcome;
