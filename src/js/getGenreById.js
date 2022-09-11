import { getGenres } from './getGenres.js';

export function getGenreById(genreId) {
  return getGenres()
    .then(({ genres }) => {
      return genres.find(genre => genre.id === genreId);
    })
    .then(genre => genre.name);
}
