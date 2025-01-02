const BASE_URL = "http://localhost:8080/api";

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/movies/genres`); 
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getMovie = async (id) => {
  const response = await fetch(`${BASE_URL}/movies/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getMoviesByGenre = async (genre) => {
  const response = await fetch(`${BASE_URL}/movies?genre=${genre}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getMoviesByYear = async (year) => {
  const response = await fetch(`${BASE_URL}/movies?year=${year}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movies/upcoming`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getMovieReviews = async (id) => {
  const response = await fetch(`${BASE_URL}/movies/${id}/reviews`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getActorDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/actors/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getActorMovies = async (id) => {
  const response = await fetch(`${BASE_URL}/actors/${id}/movies`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getMovieImages = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const response = await fetch(`${BASE_URL}/movies/${id}/images`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getMovieRecommendations = async (id) => {
  const response = await fetch(`${BASE_URL}/movies/${id}/recommendations`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getMovieCredits = async (id) => {
  const response = await fetch(`${BASE_URL}/movies/${id}/credits`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movies/trending`); 
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};