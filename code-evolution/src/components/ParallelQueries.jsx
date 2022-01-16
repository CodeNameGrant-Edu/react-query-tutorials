import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchHeroes = () => axios.get('http://localhost:4000/superheroes');
const fetchFriends = () => axios.get('http://localhost:4000/friends');

const select = (res) => res.data;

/* Parallel queries are as simple as using multiple useQuery hooks */
export default function ParallelQueries() {
  const heroes = useQuery('super-heroes', fetchHeroes, { select });
  const friends = useQuery('friends', fetchFriends, { select });

  return <div>Parallel Queries</div>;
}
