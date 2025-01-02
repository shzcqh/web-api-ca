import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovie, getMovieRecommendations, getMovieCredits } from '../api/tmdb-api';
import PageTemplate from '../components/templateMoviePage';
import Spinner from '../components/spinner';

const MoviePage = () => {
  const { id } = useParams();

  const { data: movie, isLoading: movieLoading, isError: movieError } = useQuery(
    ["movie", { id }],
    () => getMovie(id)
  );

  const { data: recommendations, isLoading: recLoading, isError: recError } = useQuery(
    ["movieRecommendations", { id }],
    () => getMovieRecommendations(id)
  );

  const { data: credits, isLoading: creditsLoading, isError: creditsError } = useQuery(
    ["movieCredits", { id }],
    () => getMovieCredits(id)
  );

  if (movieLoading || recLoading || creditsLoading) return <Spinner />;
  if (movieError) return <h1>Error loading movie details</h1>;

  return (
    <PageTemplate movie={movie}>
      <h3>Recommended Movies</h3>
      <ul>
        {recommendations?.results?.map((rec) => (
          <li key={rec.id}><Link to={`/movies/${rec.id}`}>{rec.title}</Link></li>
        ))}
      </ul>

      <h3>Cast</h3>
      <ul>
        {credits?.cast?.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default MoviePage;