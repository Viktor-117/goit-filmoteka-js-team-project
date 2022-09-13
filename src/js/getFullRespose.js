import { getGenres } from './getGenres';
import { getTrending } from './getTrending';
import { fetchMovies } from './getBySearch';

export function getFullTrendingResponce(currentPage) {
  return Promise.all([getGenres(), getTrending(currentPage)]);
}

export function getFullQueryResponse(inputQuery, currentPage) {
  return Promise.all([getGenres(), fetchMovies(inputQuery, currentPage)]);
}
