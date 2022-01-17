import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../lib/axios';

const fetchHeroes = () => axios.get('/superheroes');
const fetchFriends = () => axios.get('/friends');

const select = (res) => res.data;

/* Parallel queries are as simple as using multiple useQuery hooks */
export default function ParallelQueries() {
  const heroes = useQuery('super-heroes', fetchHeroes, { select });
  const friends = useQuery('friends', fetchFriends, { select });

  return <div>Parallel Queries</div>;
}
