import axios from 'axios';
const API_KEY = '520faa847257d57af54017c37ef43fe0';

export function getById(movieId) {
  return axios
    .get(`/${movieId}`, {
      baseURL: 'https://api.themoviedb.org/3/movie',
      params: { api_key: API_KEY },
    })
    .then(response => response.data);
}
