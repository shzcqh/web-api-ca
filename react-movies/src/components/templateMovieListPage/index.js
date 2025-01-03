import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterMoviesCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies = [], title, action }) {
  const [yearFilter, setYearFilter] = useState("All Years");
  const [genreFilter, setGenreFilter] = useState("All Genres");
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleFilterChange = (type, value) => {
    if (type === "year") {
      setYearFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      {/* Header */}
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

<Grid container justifyContent="center" sx={{ marginBottom: "20px" }}>
  <Grid item>
    <input
      type="text"
      placeholder="Search Movies"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: "10px",
        width: "300px",
        marginRight: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
    <button
      onClick={() => setSearchQuery(searchQuery.trim())}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Search
    </button>
  </Grid>
</Grid>


      {/* Filters */}
      <Grid item xs={12}>
        <FilterMoviesCard
          yearFilter={yearFilter}
          genreFilter={genreFilter}
          onUserInput={handleFilterChange}
        />
      </Grid>

      {/* Movie List */}
      <Grid item xs={12}>
        <MovieList
          action={action}
          yearFilter={yearFilter}
          genreFilter={genreFilter}
          searchQuery={searchQuery} 
        />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
