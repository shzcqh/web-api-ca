import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterMoviesCard from "../filterMoviesCard"; 
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies = [], title, action }) {
  const [yearFilter, setYearFilter] = useState("All Years");
  const [genreFilter, setGenreFilter] = useState("All Genres");

  const handleChange = (type, value) => {
    console.log(`Updating filter state: ${type} = ${value}`);
    if (type === "year") {
      setYearFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Header */}
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

      {/* Top Filters */}
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="center">
          {/* Top Filters */}
          <Grid item>
            <FilterMoviesCard
              yearFilter={yearFilter}
              genreFilter={genreFilter}
              onUserInput={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Movie List */}
      <Grid item xs={12}>
        <MovieList
          action={action}
          yearFilter={yearFilter}
          genreFilter={genreFilter}
        />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
