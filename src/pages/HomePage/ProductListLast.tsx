import { gql, useQuery } from '@apollo/client';
import { Box, Card, CardContent, CardMedia, Stack, Unstable_Grid2 as Grid } from '@mui/material';

import { Product } from '@/types';

const GET_LAST_PRODUCTS = gql`
  query getLastProducts($fetchProductsArgs: FetchProductsArgs!) {
    findProducts(fetchProductsArgs: $fetchProductsArgs) {
      ean
      name
      brand
      imageSmallUrl
      quantity
    }
  }
`;

export const ProductListLast = () => {
  const { loading, error, data } = useQuery(GET_LAST_PRODUCTS, {
    variables: { fetchProductsArgs: { skip: 0, take: 4, sortBy: 'NAME', withFoods: true } },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Grid container spacing={2}>
      {data?.findProducts.map(({ ean, name, brand, imageSmallUrl, quantity }: Product) => (
        <Grid key={ean} xs={12}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              margin: '0.5px',
              fontSize: '0.9rem',
              height: '55px',
              background: 'transparent',
              color: 'black',
            }}
          >
            <CardMedia
              component="img"
              image={imageSmallUrl || '/noimage.png'}
              sx={{ width: 70, borderRadius: '5px' }}
            />
            <CardContent sx={{ flex: '1 0 auto', paddingTop: '5px' }}>
              <Box sx={{ fontWeight: 800 }}>{name}</Box>
              <Stack justifyContent="space-between" direction="row">
                <Box>{brand}</Box> <Box sx={{ background: 'transparent' }}>{quantity}</Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
