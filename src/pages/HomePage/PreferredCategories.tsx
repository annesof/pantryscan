import { Chip } from '@/components/Chip';
import { Category } from '@/types';
import { gql, useQuery } from '@apollo/client';
import { Stack } from '@mui/material';

const GET_CATEGORIES = gql`
  query getCategories($id: Float!) {
    findOneUser(id: $id) {
      favoriteCategories {
        id
        name
        color
      }
    }
  }
`;

export const PreferredCategories = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { id: 1 },
  });

  if (loading) return <></>;
  if (error) return <>`Error! ${error}`</>;
  return (
    <Stack direction="row" ml={2}>
      {data.findOneUser.favoriteCategories.map((item: Category) => (
        <Chip key={item.id} label={item.name} color={item.color} />
      ))}
    </Stack>
  );
};
