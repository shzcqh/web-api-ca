import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users'; // User routes
import './db'; // Database initialization
import defaultErrHandler from './errHandler'; // Error handler
import moviesRouter from './api/movies'; // Movies routes
import authenticate from './authenticate'; // Authentication middleware

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// User routes
app.use('/api/users', usersRouter);

// Movies routes with authentication middleware
app.use('/api/movies',  moviesRouter);

// Error handler (should be placed after all routes)
app.use(defaultErrHandler);

// Start the server
app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
});
