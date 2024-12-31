import React, { useContext, useEffect } from 'react';
import { useQueries } from 'react-query';
import { getMovie } from '../api/tmdb-api';
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext";

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  useEffect(() => {
    console.log("MustWatch list in MustWatchPage:", movieIds);
  }, [movieIds]);

  // Create an array of queries and run them in parallel
  const mustWatchQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: () => getMovie(movieId),
    }))
  );

  // Check if any of the parallel queries is still loading
  const isLoading = mustWatchQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  // Extract movie data from the queries and handle undefined movie data
  const movies = mustWatchQueries
    .filter((q) => q.isSuccess && q.data) // 只保留成功获取的电影数据
    .map((q) => {
      q.data.genre_ids = q.data.genres ? q.data.genres.map((g) => g.id) : [];
      return q.data;
    });

  return (
    <PageTemplate
      title="Must Watch"
      movies={movies} // 传递所有有效的电影对象
      action={(movie) => {
        return <></>; // 可以自定义操作按钮，暂时留空
      }}
    />
  );
};

export default MustWatchPage;

