import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, Route, Routes } from 'react-router-dom';
import { useSuperheroes, useCreateHero } from '../hooks/useSuperheroes';
import RQSuperHero from './RQSuperHero';

export default function RQSuperheroes() {
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const { isLoading, isFetching, isError, error, data, refetch } = useSuperheroes();

  const { mutate, isLoading: isSaving, isError: isSavingError, error: saveError } = useCreateHero();

  const handleAddHeroClick = () => {
    // console.log('Add Hero:', name, alterEgo);
    mutate(
      { name, alterEgo },
      {
        onSuccess: (newData) => {
          setName('');
          setAlterEgo('');

          /* https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydata */
          // Add new item to cache
          // queryClient.setQueryData('super-heroes', (prevData) => {
          //   return [...prevData, newData];
          // });

          /* https://react-query.tanstack.com/reference/QueryClient#queryclientinvalidatequeries */
          // Invalidate query, forces a refetch
          // queryClient.invalidateQueries('super-heroes');
        },

        /* Optimistic Updates */
        /* Update before mutation is complete, and hope for the best */
        /* https://react-query.tanstack.com/guides/optimistic-updates */

        // executes before the mutaion and takes in the same params
        onMutate: async (hero) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries('super-heroes');

          // Snapshot the previous value
          const prevData = queryClient.getQueryData('super-heroes');

          queryClient.setQueryData('super-heroes', (prevData) => {
            return [...prevData.data, hero];
          });

          // Return a context object with the snapshotted value
          return { prevData };
        },

        onError: (err, newData, context) => {
          queryClient.setQueryData('super-heroes', context.prevData);
        },

        onSettled: () => {
          queryClient.invalidateQueries('super-heroes');
        }
      }
    );
  };

  return (
    <>
      <h2>RQ Super Heroes Page {isFetching && ' (isFetching)'}</h2>

      <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
        <h3>Add Hero</h3>
        <input
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type={'text'}
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
          placeholder="Alter Ego"
        />
        <button disabled={isSaving} onClick={handleAddHeroClick}>
          {isSaving ? 'Saving' : 'Add Hero'}
        </button>
        {isSavingError && saveError}
      </div>

      <div style={{ marginTop: '1em' }}>
        <button className="callout" onClick={() => refetch()}>
          Avengers Assemble!
        </button>

        {isLoading && <h3>Loading...</h3>}

        {isError && <h3>ERROR: {error.response?.data?.message || error.message}</h3>}

        {data?.map((hero) => (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        ))}
      </div>
      <hr />
      <Routes>
        <Route path=":id" element={<RQSuperHero />} />
      </Routes>
    </>
  );
}
