import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import MovieDetails from '../components/movieDetails/';
import PageTemplate from '../components/templateMoviePage';
import { getMovie, getMovieRecommendations, getMovieCredits } from '../api/tmdb-api';
import Spinner from '../components/spinner';
import { useMovies } from '../contexts/moviesContext'; 
 
const MoviePage = (props) => {
  const { id } = useParams();
  const { addToFavorites } = useMovies(); 
  
  const { data: movie, error: movieError, isLoading: movieLoading } = useQuery(
    ['movie', { id }],
    () => getMovie({ queryKey: [null, { id }] })
  );

  
  const { data: recommendations, error: recommendationError, isLoading: recommendationLoading } = useQuery(
    ['movieRecommendations', { id }],
    () => getMovieRecommendations(id)
  );

 
  const { data: credits, error: creditsError, isLoading: creditsLoading } = useQuery(
    ['movieCredits', { id }],
    () => getMovieCredits(id)
  );

  if (movieLoading || recommendationLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (recommendationError) {
    return <h4>{recommendationError}</h4>;
  }

  if (creditsError) {
    return <h4>{creditsError}</h4>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
          </PageTemplate>
          
          <h3>Recommended Movies</h3>
          <ul>
            {recommendations.results.map((recMovie) => (
              <li key={recMovie.id}>{recMovie.title}</li>
            ))}
          </ul>

          <h3>Cast</h3>
          <ul>
            {credits.cast.map((actor) => (
              <li key={actor.id}>
                <Link to={`/actor/${actor.id}`}>{actor.name}</Link> as {actor.character}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};
export default MoviePage;
