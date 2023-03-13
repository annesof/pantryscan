import { GET_LAST_PRODUCTS } from '@/data/queries';
import { Product } from '@/types';
import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ProductListLast = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_LAST_PRODUCTS, {
    variables: { fetchProductsArgs: { skip: 0, take: 4, sortBy: 'NAME', withFoods: true } },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      {data?.findProducts.map(({ ean, name, brand, imageSmallUrl }: Product) => (
        <Box
          key={ean}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: 60,
            marginBottom: '15px',
          }}
          onClick={() => navigate(`/product/${ean}`)}
        >
          <Box
            sx={{
              background: `url(${imageSmallUrl || '/noimage.png'}) no-repeat  center `,
              backgroundSize: 'cover',
              minHeight: 60,
              minWidth: 60,
              marginLeft: '2px',
              flexGrow: 0,
            }}
          ></Box>
          <Box>
            <Typography
              sx={{
                textOverflow: 'ellipsis',
                width: '250px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                marginLeft: '10px',
                fontWeight: 600,
                color: '#333333',
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                marginLeft: '10px',
                fontWeight: 700,
                color: '#59CD90',
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              {brand}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
