import React, { useState, useEffect, createContext, useContext } from "react";

export const MoviesContext = createContext();
export const useMovies = () => useContext(MoviesContext);

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState(() => {
    const stored = localStorage.getItem("mustWatch");
    return stored ? JSON.parse(stored) : [];
  });

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      setFavorites([...favorites, movie.id]);
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((id) => id !== movie.id));
  };

  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
  }, [mustWatch]);

  return (
    <MoviesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, mustWatch, addToMustWatch }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
