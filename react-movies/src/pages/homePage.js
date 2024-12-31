import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getTrendingMovies, getPopularMovies, getGenres, getMoviesByGenre, getMoviesByYear } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';


const HomePage = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(""); 
  const [selectedYear, setSelectedYear] = useState(""); // 新增年份筛选

  const { data: genresData, isLoading: isGenresLoading } = useQuery('genres', getGenres);
  const { data: trendingMoviesData, error: trendingError, isLoading: isTrendingLoading } = useQuery('trendingMovies', getTrendingMovies);

  // 查询按类型过滤的电影
  const { data: filteredMoviesData, isLoading: isFilteredLoading } = useQuery(
    ['moviesByGenre', selectedGenre],
    () => getMoviesByGenre(selectedGenre),
    {
      enabled: !!selectedGenre,
    }
  );

  // 查询按年份过滤的电影
  const { data: filteredByYearMoviesData, isLoading: isFilteredByYearLoading } = useQuery(
    ['moviesByYear', selectedYear],
    () => getMoviesByYear(selectedYear),
    {
      enabled: !!selectedYear,
    }
  );

  if (isTrendingLoading || isGenresLoading || (selectedGenre && isFilteredLoading) || (selectedYear && isFilteredByYearLoading)) {
    return <Spinner />;
  }

  if (trendingError) {
    return <h1>{trendingError.message}</h1>;
  }

  const genres = genresData?.genres || [];
  const trendingMovies = trendingMoviesData?.results || [];
  const filteredMovies = selectedGenre ? filteredMoviesData?.results : trendingMovies;
  const filteredMoviesByYear = selectedYear ? filteredByYearMoviesData?.results : filteredMovies;

  return (
    <>
      {/* 添加年份选择菜单 */}
      <h2>Filter by Year</h2>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {Array.from(new Array(50), (val, index) => new Date().getFullYear() - index).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* 保留类型选择菜单 */}
      <h2>Filter by Genre</h2>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* 显示电影列表，根据年份和类型过滤 */}
      <PageTemplate
        title={selectedYear ? "Filtered Movies by Year" : selectedGenre ? "Filtered Movies" : "Trending Movies"}
        movies={filteredMoviesByYear}
        action={(movie) => {
          return (
            <>
              <AddToFavoritesIcon movie={movie} />
              <Link to={`/movies/${movie.id}`}>
                <button>View Details</button>
              </Link>
            </>
          );
        }}
      />
    </>
  );
};

export default HomePage;
