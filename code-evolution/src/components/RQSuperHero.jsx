import React from 'react';
import { useParams } from 'react-router-dom';
import useSuperhero from '../hooks/useSuperhero';
import { Link } from 'react-router-dom';

export default function RQSuperHero() {
  const { id } = useParams();
  const { isLoading, data, isError, isSuccess, error } = useSuperhero(id);

  return (
    <>
      {isLoading && <h2>Loading Hero...</h2>}

      {isError && <h2>ERROR: {error.response?.data?.message || error.message}</h2>}

      {isSuccess && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <h2>{data.name}</h2>
            <h4>({data.alterEgo})</h4>
          </div>
          <Link to="/rq-super-heroes">Clear Selection</Link>
        </>
      )}
    </>
  );
}
