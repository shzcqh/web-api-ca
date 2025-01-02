import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_KEY;


const PROXY_URL = 'http://127.0.0.1:33210';
const proxyAgent = new HttpsProxyAgent(PROXY_URL);


export const fetchFromTMDB = async (endpoint) => {
  const url = `${TMDB_API_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`;

 
  console.log('Fetching from TMDB URL:', url);
  console.log('Using proxy:', PROXY_URL);

  try {
    const response = await fetch(url, { agent: proxyAgent });

    
    console.log('Response status from TMDB:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from TMDB:', errorData);
      throw new Error(errorData.status_message || 'Failed to fetch data from TMDB');
    }

   
    const data = await response.json();
    console.log('Data fetched from TMDB:', data);
    return data;

  } catch (error) {
   
    console.error('Error fetching from TMDB:', error.message);
    throw error;
  }
};
