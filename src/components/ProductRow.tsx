import { Category, Product } from '@/types';
import { Badge, Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductRow = ({
  product,
  locationId,
}: {
  product: Product;
  categories?: Category[];
  locationId?: string;
}) => {
  const { ean, imageSmallUrl, name, brand } = product;
  const navigate = useNavigate();

  const nbItems = useMemo(
    () =>
      locationId && locationId !== 'All'
        ? product?.articles
            ?.filter((article) => article.location.id === locationId)
            .reduce((acc, current) => {
              return (acc += current.quantity);
            }, 0)
        : product?.articles?.reduce((acc, current) => {
            return (acc += current.quantity);
          }, 0),
    [product, locationId],
  );

  return (
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
      <Badge badgeContent={nbItems} color="primary" sx={{ '& span': { color: 'white' } }}>
        <Box
          sx={{
            background: `url(${imageSmallUrl || '/noimage.png'}) no-repeat  center `,
            backgroundSize: 'cover',
            minHeight: 60,
            minWidth: 60,
            marginLeft: '2px',
            flexGrow: 0,
            borderRadius: '5px',
          }}
        />
      </Badge>
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
            fontWeight: 500,
            color: '#62AF4A',
            fontSize: '14px',
            lineHeight: '18px',
          }}
        >
          {brand}
        </Typography>
      </Box>
    </Box>
  );
};
