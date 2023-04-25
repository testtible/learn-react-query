import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';
import { useInfiniteQuery } from 'react-query';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div className='loading'>loading..</div>;
  if (isError) return <div>{`error: ${error}`}</div>;
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <div>fetching...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) =>
          pageData.results.map((item) => (
            <Species
              key={item.name}
              name={item.name}
              language={item.language}
              averageLifespan={item.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
