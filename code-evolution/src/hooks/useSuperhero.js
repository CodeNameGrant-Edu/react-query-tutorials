import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const fetchHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
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
        ?.data?.find((hero) => hero.id === parseInt(id));

      if (hero) {
        return {
          data: {
            name: hero.name
          }
        };
      } else {
        return undefined;
      }
    },

    select: (res) => {
      return res.data;
    }
  });
}
