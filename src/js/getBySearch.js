import { API_KEY } from './key.js';
import Notiflix from 'notiflix';
import Loading from './loading';
import { loadingOn, loadingOff } from './loading';
// test for deploy
/////////////////скрипт чомусь не працює, якщо імпортувати refs із index.js. Можливо, щось роблю неправильно
// import { refs } from '../index.js';

/////////////////продублював refs із index.js - так працює
const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('.input'),
  summitButton: document.querySelector('.submit-btn'),
  linkToTeam: document.querySelector('.footer__link'),
  moviesList: document.querySelector('.film__list'),
};

let currentPage = 1;

let markup = '';

let totalPages = 1;

async function fetchMovies(inputQuery, currentPage) {
  const mainUrl = `https://api.themoviedb.org/3/search/movie`;
  const filters = `?api_key=${API_KEY}&query=${inputQuery}&page=${currentPage}`;
  const response = await fetch(`${mainUrl}${filters}`);
  return response.json();
}

let inputQuery = '';
refs.searchForm.addEventListener('submit', onSearch);

export async function onSearch(event) {
  event.preventDefault();

  inputQuery = refs.searchInput.value;
  console.log(inputQuery);
  addPagination();
}

export default async function renderMoviesList(pageNumber) {
  currentPage = pageNumber;

  await fetchMovies(inputQuery, currentPage).then(res => {
    if (res.results.length >= 1) {
      markup = res.results.map(
        ({
          id,
          title,
          original_title,
          poster_path,
          genre_ids,
          release_date,
          vote_average,
        }) => {
          let poster = '';
          poster_path === null
            ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
            : (poster = poster_path);
          console.log(poster_path);
          return `<li class="gallery__item">
            <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${original_title}" class="img" id="${id}" />
            <div class="item__ptext">
              <h2 class="item__capt">${title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${genre_ids} | ${release_date}</p>
                <p class="item__rating">${vote_average}</p>
              </div>
            </div>
        </li>`;
        }
      );
      return markup;
    }
  });
}

async function addPagination() {
  await fetchMovies(inputQuery, currentPage).then(res => {
    totalPages = res.total_pages;
    return totalPages;
  });
  if (totalPages === 0) {
    Notiflix.Notify.warning('Sorry, we couldnt find any movies with that name');
    return;
  } else if (inputQuery === ``) {
    Notiflix.Notify.warning('Please enter the name of the movie');
    return;
  }
  loadingOn();
  $(`#pagination-container`).pagination({
    dataSource: function (done) {
      var result = [];
      for (var i = 1; i < totalPages; i++) {
        result.push(i);
      }
      done(result);
    },
    pageSize: 20,
    callback: async function (data, pagination) {
      await renderMoviesList(pagination.pageNumber);
      // template method of yourself
      var html = markup;
      $(`.film__list`).html(html);
    },
  });
  $(`#pagination-container`).addHook('beforePaging', function () {
    loadingOn();
  });
  $(`#pagination-container`).addHook('afterPaging', function () {
    loadingOff();
  });
  loadingOff();
}
