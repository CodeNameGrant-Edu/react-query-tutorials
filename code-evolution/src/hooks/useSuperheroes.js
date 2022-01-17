import { useMutation, useQuery } from 'react-query';
import { axios } from '../lib/axios';

const fetchHeroes = () => axios.get('/superheroes');
const addSuperHero = (hero) => axios.post('/superheroes', hero);

export const useSuperheroes = () => {
  return useQuery('super-heroes', fetchHeroes, {
    staleTime: 50000 // default: 0
    // refetchOnMount: false, //default: true
    // refetchOnWindowFocus: false, // default: true
    // refetchInterval: false // default: false
    // refetchIntervalInBackground: true // default false
    // enabled: false,
  });
};

export const useCreateHero = () => {
  return useMutation(addSuperHero);
};
