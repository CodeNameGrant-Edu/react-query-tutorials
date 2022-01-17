import React from 'react';
import { useQueries } from 'react-query';
import { axios } from '../lib/axios';

const fetchHeroes = (id) => axios.get(`/superheroes/${id}`);

export default function DynamicParallelQueries({ heroIds }) {
  const heroQueries = useQueries(
    heroIds.map((id) => ({
      queryKey: ['super-hero', id],
      queryFn: () => fetchHeroes(id),

      staleTime: 60000
    }))
  );

  console.log(heroQueries);

  return <div>Dynamic Parallel Queries</div>;
}
