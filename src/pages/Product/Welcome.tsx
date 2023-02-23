import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import useOrientation from '@/hooks/useOrientation';
import { Product } from '@/types';
import { gql, useQuery } from '@apollo/client';
import { Box, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom';
import { CreateProductPreferences } from './CreateProductPreferences';

const GET_PRODUCT_PREFERENCES_USER = gql`
  query getByProductAndUser($ean: String!, $idUser: Float!) {
    findByProductAndUser(ean: $ean, idUser: $idUser) {
      id
      location {
        id
      }
      contentUnit {
        id
      }
      categoryIds
    }
  }
`;

const GET_PRODUCT_CODE = gql`
  query getProduct($ean: String!) {
    findOneProduct(ean: $ean) {
      ean
      name
      brand
      imageSmallUrl
      quantity
      articles {
        id
      }
      categories {
        id
        name
      }
    }
  }
`;

function Welcome() {
  const isPortrait = useOrientation();

  const { ean } = useParams();
  const { error: errorPreferences, data: preferencesProduct } = useQuery(
    GET_PRODUCT_PREFERENCES_USER,
    {
      variables: { idUser: 1, ean },
    },
  );
  const { error: errorProduct, data: productData } = useQuery(GET_PRODUCT_CODE, {
    variables: { ean },
  });

  const preferences = preferencesProduct?.findByProductAndUser;
  const product: Product = productData?.findOneProduct;
  return (
    <>
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <Block>
          <Title>Ajout de l&lsquo;aliment</Title>
          <Grid container spacing={2} sx={{ marginBottom: 5 }}>
            <Grid xs={3}>
              <img src={product?.imageSmallUrl} width="60px" style={{ borderRadius: '5px' }} />
            </Grid>
            <Grid xs={9}>
              <Stack>
                <Box sx={{ fontWeight: 600 }}>{product?.name}</Box>
                <Box>{product?.quantity}</Box>
                <Box sx={{ color: 'red' }}>{product?.brand}</Box>
              </Stack>
            </Grid>
          </Grid>
          {errorPreferences && product && <CreateProductPreferences ean={product?.ean} />}
        </Block>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
