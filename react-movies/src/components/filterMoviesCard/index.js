import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getGenres } from "../../api/tmdb-api";

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard({ yearFilter, genreFilter, onUserInput }) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = [{ id: "All Genres", name: "All Genres" }, ...data.genres];

  const years = ["All Years", "2023", "2022", "2021", "2020", "2019"];

  const handleChange = (e, type) => {
    e.preventDefault();
    onUserInput(type, e.target.value);
  };

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          Filter the movies.
        </Typography>
        {/* Year Filter */}
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="year-label">Filter by Year</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={yearFilter || "All Years"}
            onChange={(e) => handleChange(e, "year")}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Genre Filter */}
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Filter by Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genreFilter || "All Genres"}
            onChange={(e) => handleChange(e, "genre")}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />
    </Card>
  );
}
