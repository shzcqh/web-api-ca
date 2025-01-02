import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_KEY;

const proxyAgent = new HttpsProxyAgent('http://127.0.0.1:33210'); 

export const fetchFromTMDB = async (endpoint) => {
  const url = `${TMDB_API_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`;
  try {
    const response = await fetch(url, { agent: proxyAgent });
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
