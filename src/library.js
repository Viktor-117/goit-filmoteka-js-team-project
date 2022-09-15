import filmCardTemplate from './hbs/modal-film-card.hbs';
import { getById } from './js/getById';
import axios from 'axios';
import { addEfectRenderer } from './js/effect_for_cart';
import { renderCollection } from './js/templates/movieTemplate';
import {
  checkLocalStorageOnwatch,
  checkLocalStorageOnQueue,
} from './js/localStorageApi';
import { loadingOn, loadingOff } from './js/loading';
import { openTeamModal, closeTeamModal } from './js/team-modal';
import {
  openFilmModal,
  closeFilmModal,
  renderFilmInfo,
  onCardClick,
  showFilmInfo,
  modalBtnChange,
} from './js/film-modal';

// ==============Додає ключ і значення (Тимчасово!)
// JSON.stringify(localStorage.setItem('watchedMovies', '[ 760741]'));
// JSON.stringify(
//   localStorage.setItem('moviesInQueue', '[616037, 361743, 760741]')
// );
const refs = {
  watchedBtn: document.querySelector('.watched_btn'),
  queueBtn: document.querySelector('.queue_btn'),
  linkToTeam: document.querySelector('.footer__link'),
  moviesList: document.querySelector('.film__list'),
  /////////
  openFilmModal: document.querySelector('[data-modal-open]'),
  closeFilmModal: document.querySelector('[data-modal-close]'),
  closeFilmModalBtn: document.querySelector('[data-modal-close-btn]'),
  filmModal: document.querySelector('[data-film-modal]'),
  filmCard: document.querySelector('[data-film-card]'),
  modalFilm: document.querySelector('.modal-film'),
};

// ==============render info page================
function renderInfoPage() {
  refs.moviesList.innerHTML = '';
  const infoPage = document.createElement('strong');
  infoPage.classList.add('info-text');
  infoPage.innerHTML = `No movies selected <a class="info-text__link" href="./index.html">Add a movie</a>`;

  return refs.moviesList.append(infoPage);
}

function renderPage() {
  if (checkLocalStorageOnwatch()) {
    renderInfoPage();
  } else {
    const watchObj = JSON.parse(localStorage.getItem('watchedMovies'));
    refs.moviesList.innerHTML = '';
    console.log(watchObj);
    for (let obj of watchObj) {
      renderCollection(obj);
      addEfectRenderer();
    }
  }
}

function clickOnWatchedBtn() {
  refs.watchedBtn.classList.add('current');
  refs.queueBtn.classList.remove('current');

  renderPage();
}

function clickOnQueueBtn() {
  refs.watchedBtn.classList.remove('current');
  refs.queueBtn.classList.add('current');

  if (checkLocalStorageOnQueue()) {
    renderInfoPage();
  } else {
    const queueObj = JSON.parse(localStorage.getItem('moviesInQueue'));
    refs.moviesList.innerHTML = '';

    for (let obj of queueObj) {
      renderCollection(obj);
      addEfectRenderer();
    }
  }
}

renderPage();

refs.watchedBtn.addEventListener('click', clickOnWatchedBtn);
refs.queueBtn.addEventListener('click', clickOnQueueBtn);
/////////
refs.openFilmModal.addEventListener('click', onCardClick);

// function closeFilmModal(e) {
//   if (
//     e.target === refs.closeFilmModal ||
//     e.currentTarget === refs.closeFilmModalBtn
//   ) {
//     refs.filmModal.classList.add('is-hidden');
//     return;
//   } else if (e.key === 'Escape') {
//     refs.filmModal.classList.add('is-hidden');
//     window.removeEventListener('keydown', closeFilmModal);
//   }
// }

// function renderFilmInfo(filmData) {
//   const markup = filmCardTemplate(filmData);
//   refs.filmCard.innerHTML = markup;
//   return Promise.resolve();
// }
// function onCardClick(event) {
//   const filmId = event.target.getAttribute('id');
//   filmId && showFilmInfo(filmId);
//   refs.modalFilm.id = filmId;
//   openFilmModal();
// }
// function showFilmInfo(movieId) {
//   getById(movieId).then(renderFilmInfo).then(openFilmModal).catch(console.log);
// }

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

// function onModalWindowClick(evt) {
//   const movieId = evt.currentTarget.id;
//   if (evt.target.id === 'watched') {
//     if (watchedMovies.includes(String(movieId))) {
//       watchedMovies.splice(watchedMovies.indexOf(movieId), 1);
//     } else {
//       watchedMovies.push(movieId);
//     }
//   } else if (evt.target.id === 'queue') {
//     if (moviesInQueue.includes(String(movieId))) {
//       moviesInQueue.splice(moviesInQueue.indexOf(movieId), 1);
//     } else {
//       moviesInQueue.push(movieId);
//     }
//   }

//   deleteWatchedMoviesDuplicates(watchedMovies);
//   deleteMoviesInQueueDuplicates(moviesInQueue);

//   localStorage.setItem('watchedMovies', JSON.stringify(filteredWatchedMovies));
//   localStorage.setItem('moviesInQueue', JSON.stringify(filteredMoviesInQueue));
// }
async function onModalWindowClick(evt) {
  const movieId = parseInt(evt.currentTarget.id);
  let movieObj = {};
  await getById(movieId).then(data => {
    movieObj = data;
  });

  const existWatchObj = watchedMovies.find(option => option.id === movieId);
  const existQueueObj = moviesInQueue.find(option => option.id === movieId);

  if (evt.target.id === 'watched') {
    if (existWatchObj === undefined) {
      evt.target.textContent = 'REMOVE FROM WATCHED';
      watchedMovies.push(movieObj);
    } else {
      evt.target.textContent = 'ADD TO WATCHED';
      watchedMovies.splice(watchedMovies.indexOf(existWatchObj), 1);
    }
  } else if (evt.target.id === 'queue') {
    if (existQueueObj === undefined) {
      evt.target.textContent = 'REMOVE FROM QUEUE';
      moviesInQueue.push(movieObj);
    } else {
      evt.target.textContent = 'ADD TO QUEUE';
      moviesInQueue.splice(moviesInQueue.indexOf(existQueueObj), 1);
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
