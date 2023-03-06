import { Chip } from '@/components/Chip';
import { Category, Product } from '@/types';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

export const ProductHeader = ({
  product,
  categories,
}: {
  product: Product;
  categories: Category[];
}) => {
  const small = useMediaQuery('(max-width:300px)');

  const nbElements = useMemo(() => {
    return product.articles?.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0,
    );
  }, [product]);

  return (
    <>
      <Box
        sx={{
          borderRadius: '50%',
          background: 'white',
          width: '120px',
          height: '120px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          top: '-80px',
          transform: 'translateX(-50%)',
          left: '50%',
        }}
      >
        <img
          src={product?.imageSmallUrl}
          width="70px"
          style={{ borderRadius: '10px', maxHeight: '85px' }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          marginTop: '-70px',
          marginBottom: '20px',
        }}
      >
        <Stack>
          <Box sx={{ textAlign: 'center', color: '#0B3954' }}>
            <Typography
              variant="subtitle1"
              display="block"
              sx={{ lineHeight: 1, fontWeight: 600, fontSize: small ? '16px' : '18px' }}
            >
              {product?.name}
            </Typography>
          </Box>
          <Box sx={{ color: '#59CD90', textAlign: 'center', fontWeight: 600 }}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              {product?.brand}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" display="block" gutterBottom>
              {product?.quantity}
            </Typography>
          </Box>

          <Box sx={{ color: '#F34242', textAlign: 'center' }}>
            {categories.map((option) => (
              <Chip color={option.color} size="small" label={option.name} key={option.id} />
            ))}
          </Box>
        </Stack>
      </Box>
    </>
  );
};
