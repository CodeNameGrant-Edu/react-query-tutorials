import axios from 'axios';
import { useQuery } from 'react-query';

const fetchHeroes = () => axios.get('http://localhost:4000/superheroes');

export default function useSuperheroes() {
  return useQuery('super-heroes', fetchHeroes, {
    // staleTime: 5000 // default: 0
    // refetchOnMount: false, //default: true
    // refetchOnWindowFocus: false, // default: true
    // refetchInterval: false // default: false
    // refetchIntervalInBackground: true // default false
    // enabled: false,
  });
}
