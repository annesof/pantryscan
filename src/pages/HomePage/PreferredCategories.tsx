import { Chip } from '@/components/Chip';
import { GET_FAV_CATEGORIES } from '@/data/requests';
import { Category } from '@/types';
import { useQuery } from '@apollo/client';
import { Stack } from '@mui/material';

export const PreferredCategories = () => {
  const { loading, error, data } = useQuery(GET_FAV_CATEGORIES, {
    variables: { id: 1 },
  });

  if (loading) return <></>;
  if (error) return <>Error! </>;
  return (
    <Stack direction="row" ml={2}>
      {data.findOneUser.favoriteCategories.map((item: Category) => (
        <Chip key={item.id} label={item.name} color={item.color} />
      ))}
    </Stack>
  );
};
