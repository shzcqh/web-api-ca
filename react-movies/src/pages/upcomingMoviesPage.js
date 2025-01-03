import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies); 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>; 
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} />; // Pass the icon button for adding to MustWatch
      }}
    />
  );
};

export default UpcomingMoviesPage;

