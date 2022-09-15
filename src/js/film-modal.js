import { getById } from './getById';
import filmCardTemplate from '../hbs/modal-film-card.hbs';
const refs = {
  openFilmModal: document.querySelector('[data-modal-open]'),
  closeFilmModal: document.querySelector('[data-modal-close]'),
  closeFilmModalBtn: document.querySelector('[data-modal-close-btn]'),
  filmModal: document.querySelector('[data-film-modal]'),
  filmCard: document.querySelector('[data-film-card]'),
  modalFilm: document.querySelector('.modal-film'),
  addToWatchedBtn: document.querySelector('.modal-film'),
};

refs.openFilmModal.addEventListener('click', onCardClick);
// refs.closeFilmModal.addEventListener('click', toggleModal);

export function openFilmModal() {
  refs.filmModal.classList.remove('is-hidden');
  refs.closeFilmModal.addEventListener('click', closeFilmModal);
  refs.closeFilmModalBtn.addEventListener('click', closeFilmModal);
  window.addEventListener('keydown', closeFilmModal);
}

export function closeFilmModal(e) {
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

export function renderFilmInfo(filmData) {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  const moviesInQueue = JSON.parse(localStorage.getItem('moviesInQueue'));
  const markup = filmCardTemplate(filmData);

  refs.filmCard.innerHTML = markup;
  const watchedButton = refs.filmCard.querySelector('#watched');
  if (watchedMovies.includes(String(filmData.id))) {
    watchedButton.textContent = 'REMOVE FROM WATCHED';
  }
  const queuedButton = refs.filmCard.querySelector('#queue');
  if (moviesInQueue.includes(String(filmData.id))) {
    queuedButton.textContent = 'REMOVE FROM QUEUE';
  }

  // console.log(watchedButton);
  return Promise.resolve();
}

export function onCardClick(event) {
  if (event.target.className === 'img') {
    // console.log(event.target.id);
    const filmId = event.target.getAttribute('id');
    filmId && showFilmInfo(filmId);
    refs.modalFilm.id = filmId;
    openFilmModal();
    modalBtnChange(filmId);
  }
}
export function showFilmInfo(movieId) {
  getById(movieId).then(renderFilmInfo).then(openFilmModal).catch(console.log);
}

function modalBtnChange(id) {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  const moviesInQueue = JSON.parse(localStorage.getItem('moviesInQueue'));
  // if (watchedMovies.includes(id)) {
  //   document.querySelector('#watched').textContent = 'REMOVE FROM WATCHED';
  //   // watchedMovies.splice(watchedMovies.indexOf(id), 1);
  // }
}
