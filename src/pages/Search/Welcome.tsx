import { Block } from '@/components/Block';
import { Chip } from '@/components/Chip';
import { ProductRow } from '@/components/ProductRow';
import { FullSizeDecenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import { GET_ALL_CATEGORIES, GET_ALL_LOCATIONS, GET_PRODUCTS } from '@/data/queries';
import { Category, Location, Product } from '@/types';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Autocomplete, Box, Stack, Tab, Tabs, TextField } from '@mui/material';
import { ReactNode, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, pt: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabContent({ locationId, categories }: { locationId?: string; categories?: Category[] }) {
  const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS, {
    fetchPolicy: 'no-cache',
  });
  const [content, setContent] = useState<Product[] | null>(null);
  const categoryIds = useMemo(() => categories?.map((item) => item.id).join(','), [categories]);

  useEffect(() => {
    getProducts({
      variables: {
        fetchProductsArgs: {
          skip: 0,
          take: 50,
          sortBy: 'NAME',
          withFoods: true,
          categories: categoryIds,
          userId: 1,
          ...(locationId !== 'All' && { location: locationId }),
        },
      },
    });
  }, [getProducts, locationId, categoryIds]);

  useEffect(() => {
    if (!loading && !error && data) {
      setContent(data.findProducts);
    }
  }, [loading, error, data]);

  if (loading) return <span>Chargement...</span>;
  if (error) return <span>Error!</span>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        //justifyContent: 'space-around',
        height: '500px',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: '15px',
      }}
    >
      {content?.map((product: Product) => (
        <ProductRow key={product.ean} product={product} locationId={locationId} />
      ))}
    </Box>
  );
}

function Welcome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: locations } = useQuery(GET_ALL_LOCATIONS);
  const locationList: Location[] = useMemo(
    () =>
      locations?.findAllLocations
        ? [{ id: 'All', name: 'Tous' }, ...locations.findAllLocations]
        : [],
    [locations?.findAllLocations],
  );

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setSearchParams({ ...Object.fromEntries(searchParams), loc: locationList[newValue].id });
  };

  const handleChangeIndex = (index: number) => {
    setSelectedTab(index);
  };

  const { data: categories } = useQuery(GET_ALL_CATEGORIES);
  const categoryList: Category[] = useMemo(
    () => categories?.findAllCategories || [],
    [categories?.findAllCategories],
  );

  useEffect(() => {
    const locationInUrl = searchParams?.get('loc');
    if (locationInUrl) {
      const locationIndex = locationList.findIndex((c) => locationInUrl === c.id);
      setSelectedLocation(locationInUrl);
      handleChangeIndex(locationIndex);
    }
    const categoriesInUrl = searchParams?.get('categ');

    if (categoriesInUrl) {
      const categsArray = categoryList.filter((c) =>
        categoriesInUrl
          .split(',')
          .map((id: string) => id)
          .includes(c.id.toString()),
      );
      setSelectedCategories(categsArray);
    }
  }, [searchParams, categoryList, locationList]);

  return (
    <>
      <FullSizeDecenteredFlexBox>
        <Block>
          <Title>Recherche</Title>
          <Stack spacing={1}>
            <Autocomplete
              onChange={(_, newValue) => {
                setSelectedCategories(newValue);
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  categ: newValue.map((item) => item.id).join(','),
                });
              }}
              multiple
              fullWidth
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              id="categories"
              value={selectedCategories}
              options={categoryList}
              disableCloseOnSelect
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

            <Tabs
              value={selectedTab}
              textColor="inherit"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="full width tabs example"
              onChange={handleTabChange}
            >
              {locationList.map((item, index) => (
                <Tab
                  key={index}
                  label={item.name}
                  onClick={() => setSelectedLocation(item.id)}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
            <SwipeableViews axis={'x'} index={selectedTab} onChangeIndex={handleChangeIndex}>
              {locationList.map((location, index) => (
                <TabPanel index={index} key={location.id} value={selectedTab}>
                  <TabContent locationId={selectedLocation} categories={selectedCategories} />
                </TabPanel>
              ))}
            </SwipeableViews>
          </Stack>
        </Block>
      </FullSizeDecenteredFlexBox>
    </>
  );
}

export default Welcome;
