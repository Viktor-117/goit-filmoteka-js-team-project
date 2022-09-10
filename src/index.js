import axios from 'axios';
import { getTrending } from './js/getTrending.js';
const API_KEY = '520faa847257d57af54017c37ef43fe0';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('.input'),
  summitButton: document.querySelector('.submit-btn'),
  linkToTeam: document.querySelector('.footer__link'),
};
