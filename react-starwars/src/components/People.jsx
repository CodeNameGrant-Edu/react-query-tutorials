import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
  const response = await fetch('https://swapi.dev/api/people');

  return response.json();
};

export default function People() {
  const { data, status } = useQuery('People', fetchPeople);
  // console.log(status, data);

  return (
    <div>
      <h2>People</h2>

      {status === 'loading' && <div>Loading People...</div>}

      {status === 'error' && <div>Error fetching data</div>}

      {status === 'success' && (
        <div>
          {data.results.map((item) => (
            <Person key={item.name} person={item} />
          ))}
        </div>
      )}
    </div>
  );
}
