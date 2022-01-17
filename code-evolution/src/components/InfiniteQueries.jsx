import React, { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import { axios } from '../lib/axios';

const fetchColors = ({ pageParam = 1 }) => axios.get(`/colors?_limit=2&_page=${pageParam}`);

export default function InfiniteQueries() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      return pages.length < 4 ? pages.length + 1 : undefined;
    }
  });

  return (
    <div>
      <h2>Colors</h2>

      {isLoading && <h3>Loading...</h3>}

      {isError && <h3>ERROR: {error}</h3>}

      {data && (
        <>
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.map((color) => (
                <h3 key={color.id}>
                  {color.id}. {color.label}
                </h3>
              ))}
            </Fragment>
          ))}
          <div>
            <button disabled={!hasNextPage} onClick={fetchNextPage}>
              Show More
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage && 'Fetching'}</div>
          <div>{isFetching && isFetchingNextPage && 'Fetching Next Page'}</div>
        </>
      )}
    </div>
  );
}
