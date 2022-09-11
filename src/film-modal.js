import { getById } from './js/getById';
import filmCardTemplate from './hbs/modal-film-card.hbs';
const refs = {
  openFilmModal: document.querySelector('[data-modal-open]'),
  closeFilmModal: document.querySelector('[data-modal-close]'),
  filmModal: document.querySelector('[data-film-modal]'),
  filmCard: document.querySelector('[data-film-card'),
};

refs.openFilmModal.addEventListener('click', toggleModal);
refs.closeFilmModal.addEventListener('click', toggleModal);

export function toggleModal() {
  refs.filmModal.classList.toggle('is-hidden');
}
function renderFilmInfo(filmData) {
  const markup = filmCardTemplate(filmData);
  refs.filmCard.innerHTML = markup;
  return Promise.resolve();
}
function showFilmInfo(movieId) {
  getById(movieId).then(renderFilmInfo).then(toggleModal).catch(console.log);
}
showFilmInfo(777);
