import { useState } from 'react';
import { useQuery } from 'react-query';
import { axios } from '../lib/axios';

const fetchColors = (page) =>
  axios.get('/colors', {
    params: {
      _limit: 2,
      _page: page
    }
  });

export default function PaginatedQueries() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', page],
    () => fetchColors(page),
    {
      // Holds onto the previous query data, until the next query has completed
      keepPreviousData: true
    }
  );

  return (
    <div>
      <h2>Colors {isFetching && '(isFetching next page)'}</h2>

      {isLoading && <h3>Loading...</h3>}

      {isError && <h3>ERROR: {error.response?.data?.message || error.message}</h3>}

      {data && (
        <>
          {data.map((item) => (
            <h3 key={item.id}>
              {item.id}. {item.label}
            </h3>
          ))}
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span>{page}</span>
            <button disabled={page === 4} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
