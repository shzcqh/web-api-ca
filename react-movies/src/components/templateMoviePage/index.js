import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import { getMovieImages } from "../../api/tmdb-api";

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const images = data?.posters || [];

  return (
    <>
      <MovieHeader movie={movie} />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid xs={3}>
          <ImageList cols={1} sx={{ height: "100vh" }}>
            {images.map((image) => (
              <ImageListItem key={image.file_path} cols={1}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={image.file_path}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid xs={9}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;