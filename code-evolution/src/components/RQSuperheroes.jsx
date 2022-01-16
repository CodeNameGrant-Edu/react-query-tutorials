import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import useSuperheroes from '../hooks/useSuperheroes';
import RQSuperHero from './RQSuperHero';

export default function RQSuperheroes() {
  const { isLoading, isFetching, isError, error, data, refetch } = useSuperheroes();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>ERROR: {error.response?.data?.message || error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page {isFetching && ' (isFetching)'}</h2>
      <button className="callout" onClick={() => refetch()}>
        Avengers Assemble!
      </button>
      {data?.data.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
      <hr />
      <Routes>
        <Route path=":id" element={<RQSuperHero />} />
      </Routes>
    </>
  );
}
