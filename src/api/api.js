import axios from 'axios';

const API_KEY = '8aba4e3419a44727b7eb66f35fce4fa2'; // Ваш ключ
const BASE_URL = 'https://api.themoviedb.org/3';

// Конфігурація Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Запит трендових фільмів
export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get(`/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    throw error;
  }
};

// Запит пошуку фільмів
export const searchMovies = async (query) => {
  try {
    const response = await api.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error.message);
    throw error;
  }
};

// Запит деталей фільму
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw error;
  }
};

// Запит акторського складу
export const fetchMovieCast = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error.message);
    throw error;
  }
};

// Запит відгуків
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error.message);
    throw error;
  }
};
