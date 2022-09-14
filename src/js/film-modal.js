import { getById } from './getById';
import filmCardTemplate from '../hbs/modal-film-card.hbs';
const refs = {
  openFilmModal: document.querySelector('[data-modal-open]'),
  closeFilmModal: document.querySelector('[data-modal-close]'),
  closeFilmModalBtn: document.querySelector('[data-modal-close-btn]'),
  filmModal: document.querySelector('[data-film-modal]'),
  filmCard: document.querySelector('[data-film-card]'),
  modalFilm: document.querySelector('.modal-film'),
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
export function showFilmInfo(movieId) {
  getById(movieId).then(renderFilmInfo).then(openFilmModal).catch(console.log);
}
