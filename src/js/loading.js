import { Loading } from 'notiflix/build/notiflix-loading-aio';

export function loadingOn() {
  Loading.standard('Loading...', {
    svgColor: '#ff001b',
    messageColor: '#ff001b',
    backgroundColor: 'none',
  });
}

export function loadingOff() {
  Loading.remove();
}


/* **************   ІНСТРУКЦІЯ :)   ****************
* Для використання Loder в своїй функції:
    * 1) в шапці свого JS файлу підключити:

import { loadingOn, loadingOff } from './loading';

    * 2) там де потрібен запуск Loading, вставляємо:

loadingOn();

    * де потрібно зупинити Loading, вставляемо:

loadingOff();

*/
