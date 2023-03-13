import { GET_ALL_LOCATIONS } from '@/data/queries';
import { Location } from '@/types';
import { useQuery } from '@apollo/client';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';

export const LocationList = () => {
  const { loading, error, data } = useQuery(GET_ALL_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Grid container spacing={2}>
      {data?.findAllLocations.map(({ id, name }: Location) => (
        <Grid key={id} xs={6}>
          <Box
            sx={{
              borderRadius: '5px',
              background: '#08B7C4',
              padding: 1,
              color: 'white',
              margin: '5px',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            {name}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
