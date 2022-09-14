import filmCardTemplate from './hbs/modal-film-card.hbs';
import { getById } from './js/getById';

import { addEfectRenderer } from './js/effect_for_cart';
import { renderCollection } from './js/templates/movieTemplate';
import {
  checkLocalStorageOnwatch,
  checkLocalStorageOnQueue,
} from './js/localStorageApi';
import { loadingOn, loadingOff } from './js/loading';
import { openTeamModal, closeTeamModal } from './js/team-modal';
import { openFilmModal, closeFilmModal, renderFilmInfo, onCardClick, showFilmInfo } from './js/film-modal';

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
    const idWatch = JSON.parse(localStorage.getItem('watchedMovies'));
    refs.moviesList.innerHTML = '';

    for (let id of idWatch) {
      loadingOn();
      getById(id)
        .then(data => {
          renderCollection(data);
          addEfectRenderer();
        })
        .finally(() => {
          loadingOff();
        });
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
    const idWatch = JSON.parse(localStorage.getItem('moviesInQueue'));
    refs.moviesList.innerHTML = '';
    loadingOn();

    for (let id of idWatch) {
      getById(id)
        .then(data => {
          renderCollection(data);
          addEfectRenderer();
        })
        .finally(() => {
          loadingOff();
        });
    }
  }
}

renderPage();

refs.watchedBtn.addEventListener('click', clickOnWatchedBtn);
refs.queueBtn.addEventListener('click', clickOnQueueBtn);
/////////
refs.openFilmModal.addEventListener('click', onCardClick);

export function openFilmModal() {
  refs.filmModal.classList.remove('is-hidden');
  refs.closeFilmModal.addEventListener('click', closeFilmModal);
  refs.closeFilmModalBtn.addEventListener('click', closeFilmModal);
  window.addEventListener('keydown', closeFilmModal);
}

function closeFilmModal(e) {
  if (
    e.target === refs.closeFilmModal ||
    e.currentTarget === refs.closeFilmModalBtn
  ) {
    refs.filmModal.classList.add('is-hidden');
    return;
  } else if (e.key === 'Escape') {
    refs.filmModal.classList.add('is-hidden');
    window.removeEventListener('keydown', closeFilmModal);
  }
}


function renderFilmInfo(filmData) {
  const markup = filmCardTemplate(filmData);
  refs.filmCard.innerHTML = markup;
  return Promise.resolve();
}
function onCardClick(event) {
  const filmId = event.target.getAttribute('id');
  filmId && showFilmInfo(filmId);
  refs.modalFilm.id = filmId;
  openFilmModal();
}
function showFilmInfo(movieId) {
  getById(movieId).then(renderFilmInfo).then(openFilmModal).catch(console.log);
}
