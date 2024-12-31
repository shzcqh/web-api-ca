import React, { useState } from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import ReactPaginate from "react-paginate"; 
import "../../styles/pagination.css"; 

const MovieList = (props) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const moviesPerPage = 8; 

  
  const offset = currentPage * moviesPerPage;
  const currentMovies = props.movies.slice(offset, offset + moviesPerPage);

  
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  
  let movieCards = currentMovies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "20px" }}>
      <Movie key={m.id} movie={m} action={props.action} />
    </Grid>
  ));

  return (
    <>
      <Grid container spacing={6}>{movieCards}</Grid>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(props.movies.length / moviesPerPage)}
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
