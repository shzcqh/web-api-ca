import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getActorDetails, getActorMovies } from '../api/tmdb-api';
import Spinner from '../components/spinner';


const ActorDetailsPage = () => {
  const { id } = useParams();

  
  const { data: actor, error: actorError, isLoading: actorLoading } = useQuery(
    ['actorDetails', { id }],
    () => getActorDetails(id)
  );

 
  const { data: movies, error: moviesError, isLoading: moviesLoading } = useQuery(
    ['actorMovies', { id }],
    () => getActorMovies(id)
  );

  if (actorLoading || moviesLoading) {
    return <Spinner />;
  }

  if (actorError) {
    return <h1>{actorError.message}</h1>;
  }

  if (moviesError) {
    return <h4>{moviesError}</h4>;
  }

  return (
    <div>
      <h2>{actor.name}</h2>
      <p>{actor.biography}</p>

      <h3>Movies</h3>
      <ul>
        {movies.cast.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorDetailsPage;
