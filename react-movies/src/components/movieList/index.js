import React, { useState, useEffect } from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import ReactPaginate from "react-paginate";
import "../../styles/pagination.css";
import { getMovies } from "../../api/movies-api";

const MovieList = ({ action }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const page = currentPage + 1;
        const data = await getMovies(page, moviesPerPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error.message);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const movieCards = movies.map((m) => (
    <Grid
      key={m.id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      sx={{ padding: "20px" }}
    >
      <Movie key={m.id} movie={m} action={action} />
    </Grid>
  ));

  return (
    <>
      <Grid container spacing={6}>{movieCards}</Grid>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default MovieList;
