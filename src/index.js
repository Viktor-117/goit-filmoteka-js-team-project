export const API_KEY = '520faa847257d57af54017c37ef43fe0';
import { toggleModal } from './film-modal';
import axios from 'axios';
import { getTrending } from './js/getTrending.js';
import pagination from './js/pagination';
const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('.input'),
  summitButton: document.querySelector('.submit-btn'),
  linkToTeam: document.querySelector('.footer__link'),
};
