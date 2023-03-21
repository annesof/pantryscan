import { ProductRow } from '@/components/ProductRow';
import { GET_PRODUCTS } from '@/data/queries';
import { Product } from '@/types';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';

export const ProductListLast = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      fetchProductsArgs: {
        skip: 0,
        take: 3,
        sortBy: 'DATE',
        withFoods: true,
        userId: 1,
        categories: '',
      },
      fetchPolicy: 'no-cache',
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      {data?.findProducts.map((product: Product) => (
        <ProductRow key={product.ean} product={product} />
      ))}
    </Box>
  );
};
