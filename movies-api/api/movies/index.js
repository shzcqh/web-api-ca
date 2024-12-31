import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, fetchFromTMDB } from '../tmdb-api'; // Import TMDB API service

const router = express.Router();

// Get paginated list of movies
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit]; // Convert to numbers

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
        return res.status(400).json({ message: 'Page and limit must be positive numbers.' });
    }

    // Fetch total movies and paginated results in parallel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);

    const total_pages = Math.ceil(total_results / limit);

    res.status(200).json({
        page,
        total_pages,
        total_results,
        results
    });
}));

// Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await fetchFromTMDB('/genre/movie/list');
        res.status(200).json(genres);
    } catch (error) {
        console.error('Error fetching genres from TMDB:', error.message);
        res.status(500).json({ message: 'Failed to fetch genres from TMDB', error: error.message });
    }
}));


export default router;
