import { openFilmModal, showFilmInfo, closeFilmModal } from './js/film-modal';
export const API_KEY = '520faa847257d57af54017c37ef43fe0';
import axios from 'axios';
import { getTrending } from './js/getTrending.js';
// import { createMarkup } from './js/markupListMovies.js';
import pagination from './js/pagination';
import { onSearch } from './js/getBySearch.js';
import { openTeamModal, closeTeamModal } from './js/team-modal';
import './js/scroll-button';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('.input'),
  summitButton: document.querySelector('.submit-btn'),
  linkToTeam: document.querySelector('.footer__link'),
  moviesList: document.querySelector('.film__list'),
};

export { refs };

const modalWindowRef = document.querySelector('.modal-film');

modalWindowRef.addEventListener('click', onModalWindowClick);

let watchedMovies = [];
let moviesInQueue = [];
let filteredWatchedMovies = [];
let filteredMoviesInQueue = [];

if (localStorage.getItem('watchedMovies') === null) {
  watchedMovies = [];
} else {
  watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
}

if (localStorage.getItem('moviesInQueue') === null) {
  moviesInQueue = [];
} else {
  moviesInQueue = JSON.parse(localStorage.getItem('moviesInQueue'));
}

function onModalWindowClick(evt) {
  const movieId = evt.currentTarget.id;
  const localStorageWatched = JSON.parse(localStorage.getItem('watchedMovies'));
  const localStorageQueue = JSON.parse(localStorage.getItem('moviesInQueue'));
  if (evt.target.id === 'watched') {
    console.log(localStorageWatched.includes(String(movieId)));
    if (localStorageWatched.includes(String(movieId))) {
      console.log(movieId);
      localStorage.removeItem('watchedMovies', movieId);
    } else {
      watchedMovies.push(movieId);
    }
  } else if (evt.target.id === 'queue') {
    if (localStorageQueue.includes(String(evt.target.id))) {
      localStorageQueue.splice(localStorageQueue.indexOf(evt.target.id), 1);
    } else {
      moviesInQueue.push(movieId);
    }
  }

  deleteWatchedMoviesDuplicates(watchedMovies);
  deleteMoviesInQueueDuplicates(moviesInQueue);

  localStorage.setItem('watchedMovies', JSON.stringify(filteredWatchedMovies));
  localStorage.setItem('moviesInQueue', JSON.stringify(filteredMoviesInQueue));
}

function deleteWatchedMoviesDuplicates(movies) {
  filteredWatchedMovies = movies.filter((item, index) => {
    return movies.indexOf(item) === index;
  });
  return filteredWatchedMovies;
}

function deleteMoviesInQueueDuplicates(movies) {
  filteredMoviesInQueue = movies.filter((item, index) => {
    return movies.indexOf(item) === index;
  });
  return filteredMoviesInQueue;
}
