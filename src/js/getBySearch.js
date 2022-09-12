import { API_KEY } from './key.js';


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

async function fetchMovies(inputQuery) {
    const mainUrl = `https://api.themoviedb.org/3/search/movie`;
    const filters = `?api_key=${API_KEY}&query=${inputQuery}`;
    const response = await fetch(`${mainUrl}${filters}`);
    return response.json();
  };

let inputQuery = ""
refs.searchForm.addEventListener("submit", onSearch);

export async function onSearch(event){
    event.preventDefault()

    inputQuery = refs.searchInput.value
    console.log(inputQuery)
    const newMovies = await fetchMovies(inputQuery)
    const a = renderMoviesList(newMovies.results)
    console.log(a)

}

function renderMoviesList(movies){
    console.log(movies)
    const markup = movies.map(
      (
        a
        // id,
        // title,
        // original_title,
        // poster_path,
        // genre_ids,
        // release_date,
        // vote_average,
      ) => {
        return `<li class="gallery__item">
          <img src="https://image.tmdb.org/t/p/w500${a.poster_path}" alt="${a.original_title}" class="img" />
          <div class="item__ptext">
            <h2 class="item__capt">${a.title}</h2>
            <div class="item__wrap">
              <p class="item__genre">${a.genre_ids} | ${a.release_date}</p>
              <p class="item__rating">${a.vote_average}</p>
            </div>
          </div>
        </li>`;
      }
    )
    .join('');
  refs.moviesList.innerHTML = markup;

}
