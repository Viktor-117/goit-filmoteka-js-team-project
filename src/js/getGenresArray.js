import { getGenres } from './getGenres';

export function getGenresArray() {
  getGenres().then(genres => {
    localStorage.setItem('genres', JSON.stringify(genres));
  });

  const genresObj = JSON.parse(localStorage.getItem('genres'));

  const genresArray = genresObj.genres;

  return genresArray;
}
