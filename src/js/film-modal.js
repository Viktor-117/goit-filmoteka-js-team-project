import { getById } from './getById';
import filmCardTemplate from '../hbs/modal-film-card.hbs';
const refs = {
  openFilmModal: document.querySelector('[data-modal-open]'),
  closeFilmModal: document.querySelector('[data-modal-close]'),
  filmModal: document.querySelector('[data-film-modal]'),
  filmCard: document.querySelector('[data-film-card]'),
  modalFilm: document.querySelector('.modal-film'),
};

refs.openFilmModal.addEventListener('click', onCardClick);
refs.closeFilmModal.addEventListener('click', toggleModal);

export function closeFilmModal(e) {
  if (e.key === 'Escape') {
    toggleModal();
    window.removeEventListener('keydown', closeFilmModal);
  }
}

export function toggleModal() {
  refs.filmModal.classList.toggle('is-hidden');
  window.addEventListener('keydown', closeFilmModal);
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
}
export function showFilmInfo(movieId) {
  getById(movieId).then(renderFilmInfo).then(toggleModal).catch(console.log);
}
