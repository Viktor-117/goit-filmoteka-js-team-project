import axios from 'axios';
import { API_KEY } from './key.js';
import { refs } from '../index.js';
const API_KEY = '520faa847257d57af54017c37ef43fe0';

const srcImgBase = 'https://image.tmdb.org/t/p/w500';
let currentPage = 1;

export async function getTrending(currentPage) {
  try {
    const resTrending = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
    );
    return await resTrending.data;
  } catch (error) {
    console.log(error);
  }
}

getTrending(currentPage).then(res => {
  refs.moviesList.insertAdjacentHTML('beforeend', createMarkup(res));
});

function createMarkup(res) {
  if (res.results.length >= 1) {
    const markup = res.results
      .map(
        ({
          id,
          title,
          original_title,
          poster_path,
          genre_ids,
          release_date,
          vote_average,
        }) => {
          return `<li class="gallery__item">
            <img src="${srcImgBase}${poster_path}" alt="${original_title}" class="img" />
            <div class="item__ptext">
              <h2 class="item__capt">${title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${genre_ids} | ${release_date}</p>
                <p class="item__rating">${vote_average}</p>
              </div>
            </div>
          </li>`;
        }
      )
      .join('');
    return markup;
  }
}
