import { getTrending } from './getTrending';
import Loading from './loading';

const refs = {
  moviesList: document.querySelector('.film__list'),
};
const API_KEY = '520faa847257d57af54017c37ef43fe0';
//end temp temporary constants
let totalPages = 1;
let markup = ``;
let currentPage = 1;
const srcImgBase = 'https://image.tmdb.org/t/p/w500';
export default async function renderMoviesList(pageNumber) {
  currentPage = pageNumber;
  await getTrending(currentPage).then(res => {
    totalPages = res.total_pages;
    return totalPages;
  });
  await getTrending(currentPage).then(res => {
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
          poster_path === ' '
            ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
            : (poster = poster_path);
          console.log(poster_path);
          return `<li class="gallery__item">
            <img src="${srcImgBase}${poster}" alt="${original_title}" class="img" id="${id}" />
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
  await renderMoviesList(1);
  $(`#pagination-container`).addHook('beforePaging', function () {
    Loading.standard('Loading...');
  });
  $(`#pagination-container`).addHook('afterPaging', function () {
    Loading.remove();
  });
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
}

addPagination();
