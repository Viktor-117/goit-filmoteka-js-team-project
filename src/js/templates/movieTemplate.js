const srcImgBase = 'https://image.tmdb.org/t/p/w500';
const refs = {
  moviesList: document.querySelector('.film__list'),
};

function movieTemplate(data) {
  console.log(data)
  let filmGenre = [];
  for (let object of data.genres) {
    filmGenre.push(object.name);
  }

  return `<li class="gallery__item" data-itemid="${data.id}">
            <img src="${srcImgBase}${data.poster_path}" alt="${
    data.original_title
  }" class="img" />
            <div class="item__ptext">
              <h2 class="item__capt">${data.title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${filmGenre.join(' ')} | ${
    data.release_date
  }</p>
                <p class="item__rating">${data.vote_average}</p>
              </div>
            </div>
          </li>`;
}

export function renderCollection(data) {
  const markup = movieTemplate(data);
  refs.moviesList.insertAdjacentHTML('beforeend', markup);
}