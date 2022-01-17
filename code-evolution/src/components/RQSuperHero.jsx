import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSuperhero from '../hooks/useSuperhero';

export default function RQSuperHero() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError, isSuccess, error } = useSuperhero(id);

  return (
    <>
      {isLoading && <h2>Loading Hero...</h2>}

      {isError && <h2>ERROR: {error.response?.data?.message || error.message}</h2>}

      {isSuccess && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <button onClick={() => navigate('../')}>X</button>
            <h2>{data.name}</h2>
            {data.alterEgo && <h4>({data.alterEgo})</h4>}
          </div>
        </>
      )}
    </>
  );
}
