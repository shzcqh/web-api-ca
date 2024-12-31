import fetch from 'node-fetch';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_KEY;

// General function to fetch data from TMDB
export const fetchFromTMDB = async (endpoint) => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.status_message || 'Failed to fetch data from TMDB');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching from TMDB:', error.message);
        throw error;
    }
};

// Get list of upcoming movies
export const getUpcomingMovies = async () => {
    return await fetchFromTMDB('/movie/upcoming');
};
