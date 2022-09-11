const API_KEY = '520faa847257d57af54017c37ef43fe0';

import axios from 'axios';

export async function getGenres() {
  try {
    const resGenres = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return await resGenres.data;
  } catch (error) {
    console.log(error);
  }
}
