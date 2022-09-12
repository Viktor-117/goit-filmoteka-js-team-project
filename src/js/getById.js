import axios from 'axios';

const API_KEY = '520faa847257d57af54017c37ef43fe0';

export async function getById(id) {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    return await data;
  } catch (error) {
    console.log(error);
  }
}
