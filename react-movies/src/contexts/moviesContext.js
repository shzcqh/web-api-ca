import React, { useState, useEffect, createContext, useContext } from "react";

export const useMovies = () => useContext(MoviesContext);
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState(() => {
    // 从 localStorage 加载数据
    const storedMustWatch = localStorage.getItem("mustWatch");
    return storedMustWatch ? JSON.parse(storedMustWatch) : [];
  });

  useEffect(() => {
    // 当 mustWatch 更新时保存到 localStorage
    localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
  }, [mustWatch]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };
  console.log(myReviews);

  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const newMustWatch = [...mustWatch, movie.id];
      setMustWatch(newMustWatch);
      console.log("MustWatch updated:", newMustWatch); 
    } else {
      console.log("Movie is already in the MustWatch list:", movie.id);
    }
  };
  

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

