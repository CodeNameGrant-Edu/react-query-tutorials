import React, { useEffect, useState } from 'react';
import { axios } from '../lib/axios';

export default function Superheros() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/superheroes')
      .then(setData)
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>ERROR: {error}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </>
  );
}
