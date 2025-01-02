import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, fetchFromTMDB } from '../tmdb-api';
import authenticate from '../../authenticate';
import Review from './reviewModel';
const router = express.Router();
// Get predefined genres
router.get('/genres', asyncHandler(async (req, res) => {
    const genres = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" },
    ];
    res.status(200).json({ genres });
}));

// Get trending movies

router.get('/trending', asyncHandler(async (req, res) => {
    try {
        console.log('Starting to fetch trending movies from TMDB...');

        // Define the TMDB endpoint
        const endpoint = '/trending/movie/week';
        
        // Fetch data from TMDB
        const trendingMovies = await fetchFromTMDB(endpoint);

        // Check if the response is valid
        if (!trendingMovies || !trendingMovies.results) {
            console.error('Invalid response from TMDB:', trendingMovies);
            return res.status(500).json({ message: 'Failed to fetch valid trending movies data from TMDB.' });
        }

        // Log success and send response
        console.log('Trending movies successfully fetched:', trendingMovies.results);
        res.status(200).json(trendingMovies.results);
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching trending movies:', error.message);

        // Return the error response
        res.status(500).json({
            message: 'Error fetching trending movies',
            error: error.message
        });
    }
}));


// Get paginated list of movies with optional filters
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, genre, year } = req.query;
    [page, limit] = [+page, +limit]; // Convert to numbers

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return res.status(400).json({ message: 'Page and limit must be positive numbers.' });
    }

    const filter = {};

    if (genre) {
        const genreId = parseInt(genre, 10);
        if (isNaN(genreId)) {
            return res.status(400).json({ message: 'Genre must be a valid number.' });
        }
        filter.genre_ids = { $in: [genreId] };
    }

    if (year) {
        const yearPattern = new RegExp(`^${year}`);
        filter.release_date = { $regex: yearPattern };
    }

    const [total_results, results] = await Promise.all([
        movieModel.countDocuments(filter),
        movieModel.find(filter).limit(limit).skip((page - 1) * limit),
    ]);

    const total_pages = Math.ceil(total_results / limit);

    res.status(200).json({
        page,
        total_pages,
        total_results,
        results,
    });
}));

// Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid movie ID. Must be a number.' });
    }

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

// Get popular movies from TMDB
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    try {
        const popularMovies = await fetchFromTMDB('/movie/popular');
        res.status(200).json(popularMovies.results);
    } catch (error) {
        console.error('Error fetching popular movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch popular movies from TMDB', error: error.message });
    }
}));

// Add a new review for a movie
router.post('/:id/reviews', authenticate, asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid movie ID. Must be a number.' });
    }

    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Comments cannot be empty.' });
    }

    const review = new Review({
        movieId: id,
        userId: req.user._id,
        content,
    });

    await review.save();
    res.status(201).json({ message: 'The comment was added successfully.', review });
}));

// Get reviews for a movie
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid movie ID. Must be a number.' });
    }

    const reviews = await Review.find({ movieId: id }).populate('userId', 'username');
    res.status(200).json(reviews);
}));



export default router;
