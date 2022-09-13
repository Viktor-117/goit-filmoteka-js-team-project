// import { getTrending } from './js/getTrending';
import { getById } from './js/getById';
import { addEfectRenderer } from './js/effect_for_cart';
import { renderCollection } from './js/templates/movieTemplate';
import {
  checkLocalStorageOnwatch,
  checkLocalStorageOnQueue,
} from './js/localStorageApi';
import Loading from './js/loading';
import { loadingOn, loadingOff } from './js/loading';
import { openTeamModal, closeTeamModal } from './js/team-modal';

// ==============Додає ключ і значення (Тимчасово!)
// JSON.stringify(localStorage.setItem('watchedMovies', '[ 760741]'));
JSON.stringify(
  localStorage.setItem('moviesInQueue', '[616037, 361743, 760741]')
);
const refs = {
  watchedBtn: document.querySelector('.watched_btn'),
  queueBtn: document.querySelector('.queue_btn'),
  linkToTeam: document.querySelector('.footer__link'),
  moviesList: document.querySelector('.film__list'),
};

// ==============render info page================
function renderInfoPage() {
  refs.moviesList.innerHTML = '';
  const infoPage = document.createElement('strong');
  infoPage.classList.add('info-text');
  infoPage.innerHTML = `No movies selected <a class="info-text__link" href="/">Add a movie</a>`;

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
  console.log('queue');
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
