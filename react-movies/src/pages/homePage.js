import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMoviesByGenre, getMoviesByYear, getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data: trendingMovies, isLoading: isTrendingLoading } = useQuery(
    "trendingMovies",
    getTrendingMovies
  );

  const { data: moviesByGenre, isLoading: isGenreLoading } = useQuery(
    ["moviesByGenre", selectedGenre],
    () => getMoviesByGenre(selectedGenre),
    { enabled: !!selectedGenre }
  );

  const { data: moviesByYear, isLoading: isYearLoading } = useQuery(
    ["moviesByYear", selectedYear],
    () => getMoviesByYear(selectedYear),
    { enabled: !!selectedYear }
  );

  if (isTrendingLoading || isGenreLoading || isYearLoading) return <Spinner />;

  const movies =
    moviesByYear?.results || moviesByGenre?.results || trendingMovies?.results;

  return (
    <>
      <h2>Filter by Year</h2>
      <select
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          setSelectedGenre("");
        }}
      >
        <option value="">All Years</option>
        {Array.from({ length: 50 }, (_, index) => new Date().getFullYear() - index).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <h2>Filter by Genre</h2>
      <select
        value={selectedGenre}
        onChange={(e) => {
          setSelectedGenre(e.target.value);
          setSelectedYear("");
        }}
      >
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
      </select>

      <PageTemplate
        title={
          selectedYear
            ? "Movies Filtered by Year"
            : selectedGenre
            ? "Movies Filtered by Genre"
            : "Trending Movies"
        }
        movies={movies}
        action={(movie) => <button>Add to Favorites</button>}
      />
    </>
  );
};

export default HomePage;

