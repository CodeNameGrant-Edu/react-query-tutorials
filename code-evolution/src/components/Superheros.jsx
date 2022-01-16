import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Superheros() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/superheroes')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setError(error.response?.data?.message || error.message);
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
