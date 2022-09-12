import { Loading } from 'notiflix/build/notiflix-loading-aio';

export default Loading;

/*
* ІНСТРУКЦІЯ :)
* Для використання Loder в своїй функції:

* 1) в шапці свого JS файлу підключити:
import Loading from './loading';

* 2) там де потрібен запуск Loading, вставляємо:
Loading.standard('Loading...');

* де потрібно зупинити Loading, вставляемо:
Loading.remove();

*/