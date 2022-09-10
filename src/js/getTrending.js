import axios from 'axios';

import { API_KEY } from '../index.js';
import { refs } from '../index.js';
let currentPage = 1;

export async function getTrending(currentPage) {
  try {
    return (responseTrending = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
    ));
  } catch (error) {
    console.log(error);
  }
}

// const renderTrendingList = movies => {
//   const result = movies
//     .map(({}) => {
//       return `<li class="gallery__item">
//             <img src="Film src" alt="film alt" class="img" />
//             <div class="item__ptext">
//               <h2 class="item__capt">Film Name</h2>
//               <div class="item__wrap">
//                 <p class="item__genre">Genres and date</p>
//                 <p class="item__rating">rating</p>
//               </div>
//             </div>
//           </li>`;
//     })
//     .join('');
//   refs.moviesList.insertAdjacentHTML('beforeend', result);
// };
