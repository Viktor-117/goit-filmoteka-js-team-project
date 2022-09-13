import { getGenresArray } from './getGenresArray.js';

const genresArray = getGenresArray();

export function getGenreById(genreId) {
  const genres = genresArray.find(option => option.id === genreId);
  return genres.name;
}
