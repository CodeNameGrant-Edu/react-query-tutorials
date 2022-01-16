import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

const fetchHeroes = (id) => axios.get(`http://localhost:4000/superheroes/${id}`);

const select = (res) => res.data;

export default function DynamicParallelQueries({ heroIds }) {
  const heroQueries = useQueries(
    heroIds.map((id) => ({
      queryKey: ['super-hero', id],
      queryFn: () => fetchHeroes(id),

      staleTime: 60000,
      select
    }))
  );

  console.log(heroQueries);

  return <div>Dynamic Parallel Queries</div>;
}
