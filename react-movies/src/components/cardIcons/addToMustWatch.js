import React, { useContext } from 'react';
import { MoviesContext } from '../../contexts/moviesContext';
import IconButton from '@mui/material/IconButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToMustWatchIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    console.log("Adding movie to MustWatch:", movie); 
    addToMustWatch(movie); // Properly call context function to add movie to MustWatch list
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
