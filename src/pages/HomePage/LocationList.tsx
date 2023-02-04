import { Location } from '@/types';
import { gql, useQuery } from '@apollo/client';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';

const GET_LOCATIONS = gql`
  query getLocations {
    findAllLocations {
      id
      name
    }
  }
`;

export const LocationList = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Grid container spacing={2}>
      {data?.findAllLocations.map(({ id, name }: Location) => (
        <Grid key={id} xs={6}>
          <Box
            sx={{
              borderRadius: '5px',
              background: '#74DDE4',
              padding: 1,

              margin: '5px',
              fontSize: '0.9rem',
            }}
          >
            {name}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
