# Assignment 2 - Web API.

Name: Huaze shao

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Feature 1 
 + Feature 2 
 + Feature 3 
 + etc

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

## Independent learning (if relevant)

Extend the web API  
API Design
The API includes the following endpoints:

Endpoint	HTTP Method	Description
/api/movies	GET	Gets a paginated list of movies (supports filtering by genre and year).
/api/movies/{movieid}	GET	Gets details of a specific movie.
/api/movies/{movieid}/reviews	GET	Fetches all reviews for a movie.
/api/movies/{movieid}/reviews	POST	Adds a new review for a movie (authenticated).
/api/movies/trending	GET	Fetches trending movies from TMDB.
/api/movies/genres	GET	Fetches a predefined list of movie genres.
/api/movies/tmdb/upcoming	GET	Fetches upcoming movies from TMDB.
Security and Authentication
Authentication: Implemented using JSON Web Tokens (JWT).
Protected Routes:
POST /api/movies/{movieid}/reviews - Requires a valid JWT for user authentication.
User Management:
Login and signup routes were implemented in earlier labs.
Integrating with React App
Views Using the Web API:
Trending Movies View:
Fetches trending movies using the /api/movies/trending endpoint.
Genres View:
Fetches genres from /api/movies/genres.
Movie Reviews View:
Displays reviews using /api/movies/{movieid}/reviews.
Movies List:
Displays a list of movies with pagination and filtering using /api/movies.
Updates to React App:
Refactored API calls to replace TMDB API with the Movies API.
Improved error handling for all API requests.
Independent Learning
TMDB API Integration: Researched how to interact with TMDB's trending and upcoming movie endpoints.
Authentication: Integrated JWT-based authentication for user-specific operations, including posting reviews.
Web API Integration
Features Implemented
Additional Features Beyond Labs
Search Functionality:
Added a /api/movies/search endpoint to allow keyword-based search of movies.
Integrated a search bar in the frontend to utilize this feature.
Year and Genre Filtering:
Enabled /api/movies endpoint to accept year and genre query parameters.
Integrated dropdown filters in the frontend for dynamic filtering.
Pagination:
Integrated pagination on the /api/movies endpoint using page and limit parameters.
Implemented frontend pagination with React Paginate to display paged results dynamically.
Frontend Integration:
Fully replaced TMDB API calls with custom Web API.
Ensured seamless interaction between frontend components and backend services.
Integrating with React App
Features Using Web API
Movies Page:
Displays a list of movies based on API responses.
Utilizes /api/movies, /api/movies/search, and /api/movies/genres endpoints.
Search Functionality:
Frontend search bar integrates with /api/movies/search.
Displays real-time search results dynamically.
Filtering by Year and Genre:
Dropdown filters interact with /api/movies endpoint to dynamically fetch filtered results.
Pagination:
Frontend uses backend pagination data to allow seamless navigation between movie pages.

