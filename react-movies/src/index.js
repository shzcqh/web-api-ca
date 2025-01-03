import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import MustWatchPage from "./pages/mustWatchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./contexts/PrivateRoute"; 
import { theme } from "./theme"; 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <div
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              minHeight: "100vh",
            }}
          >
            <SiteHeader />
            <Routes>
          
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/actor/:id" element={<ActorDetailsPage />} />
              <Route path="*" element={<Navigate to="/" />} />

              
              <Route
                path="/movies/favorites"
                element={
                  <PrivateRoute>
                    <FavoriteMoviesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/movies/mustWatch"
                element={
                  <PrivateRoute>
                    <MustWatchPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
