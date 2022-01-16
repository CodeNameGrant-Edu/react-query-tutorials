import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);

  return response.json();
};

export default function Planets() {
  const [page, setPage] = useState(1);

  const { data, isSuccess, isLoading, isError } = useQuery(['planets', page], fetchPlanets, {
    keepPreviousData: true
  });

  return (
    <div>
      <h2>Planets</h2>

      {isLoading && <div>Loading PLanets...</div>}

      {isError && <div>Error fetching data</div>}

      {isSuccess && (
        <>
          <div style={{ textAlign: 'center' }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((prevSate) => Math.max(prevSate - 1, 1))}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              disabled={data.next === null}
              onClick={() => setPage((prevSate) => (data.next ? prevSate + 1 : prevSate))}
            >
              Next
            </button>
          </div>
          <div>
            {data.results.map((item) => (
              <Planet key={item.name} planet={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
