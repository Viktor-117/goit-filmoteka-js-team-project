import { toggleModal, showFilmInfo, closeFilmModal } from './js/film-modal';
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
console.log(localStorage.getItem('watchedMovies'));

let watchedMovies = [];
let moviesInQueue = [];

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
  if (evt.target.id === 'watched') {
    watchedMovies.push(movieId);
  } else if (evt.target.id === 'queue') {
    moviesInQueue.push(movieId);
  }

  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  localStorage.setItem('moviesInQueue', JSON.stringify(moviesInQueue));
}
