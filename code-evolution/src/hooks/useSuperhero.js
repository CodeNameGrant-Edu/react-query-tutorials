import axios from 'axios';
import { useQuery } from 'react-query';

const fetchHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

export default function useSuperhero(id) {
  return useQuery({
    queryKey: ['super-hero', parseInt(id)],
    queryFn: () => fetchHero(id),
    staleTime: 60000,
    select: (res) => {
      return res.data;
    }
  });
}
