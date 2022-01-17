import { useQuery, useQueryClient } from 'react-query';
import { axios } from '../lib/axios';

const fetchHero = (id) => {
  return axios.get(`/superheroes/${id}`);
};

export default function useSuperhero(id) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['super-hero', parseInt(id)],
    queryFn: () => fetchHero(id),

    /* https://react-query.tanstack.com/guides/initial-query-data */
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.find((hero) => hero.id === parseInt(id));

      if (hero) {
        return {
          name: hero.name
        };
      } else {
        return undefined;
      }
    }
  });
}
