import axios from "axios";

// Base URL for your backend API
const API_BASE_URL = "http://localhost:8080/api";

// Fetch all movies (paginated)
export const getMovies = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_BASE_URL}/movies`, {
    params: { page, limit },
  });
  return response.data;
};

// Fetch movie details by ID
export const getMovieById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
  return response.data;
};

// Add a review for a movie
export const addReview = async (id, reviewContent, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/movies/${id}/reviews`,
    { content: reviewContent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

