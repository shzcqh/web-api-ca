import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { getMovieById } from "../../api/movies-api"; // Import the API call function

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movieId }) => {
  const [movie, setMovie] = useState(null); // State to store movie details fetched from the backend
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer visibility

  useEffect(() => {
    // Fetch movie details from the backend
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieById(movieId); // Call the API to fetch movie details
        setMovie(data); // Set movie details in the state
      } catch (error) {
        console.error("Failed to fetch movie details:", error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]); // Dependency array to fetch movie details on movieId change

  if (!movie) return <p>Loading...</p>; // Show loading state until the movie details are fetched

  return (
    <>
      <Typography variant="h5" component="h3">Overview</Typography>
      <Typography variant="h6" component="p">{movie.overview}</Typography>

      {/* Render movie genres */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      {/* Render runtime, revenue, vote average, and release date */}
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      {/* Render production countries */}
      {movie.production_countries && movie.production_countries.length > 0 && (
        <Paper component="ul" sx={{ ...root }}>
          <li>
            <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
          </li>
          {movie.production_countries.map((country, index) => (
            <li key={index}>
              <Chip label={country.name} sx={{ ...chip }} />
            </li>
          ))}
        </Paper>
      )}

      {/* Floating button to open the drawer for movie reviews */}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
