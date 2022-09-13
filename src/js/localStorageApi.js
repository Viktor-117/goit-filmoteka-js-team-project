export function checkLocalStorageOnwatch() {
  if (
    localStorage.getItem('watchedMovies') === null ||
    localStorage.getItem('watchedMovies') === ''
  ) {
    return true;
  }

  return false;
}
export function checkLocalStorageOnQueue() {
  if (
    localStorage.getItem('moviesInQueue') === null ||
    localStorage.getItem('moviesInQueue') === ''
  ) {
    return true;
  }

  return false;
}
