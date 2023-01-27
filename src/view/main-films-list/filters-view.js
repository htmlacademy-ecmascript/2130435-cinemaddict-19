import AbstractView from '../../framework/view/abstract-view.js';
import { TypeButton } from '../../utils/const.js';

function createFiltersFilms({ watchlist, watched, favorite }) {
  return `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
  </nav>`;
}

export default class FiltersFilmsView extends AbstractView {
  #counters = {};

  constructor({ watchListCounter, watchedCounter, favoriteCounter }) {
    super();
    this.#counters[TypeButton.WATCHLIST] = watchListCounter;
    this.#counters[TypeButton.WATCHED] = watchedCounter;
    this.#counters[TypeButton.FAVORITE] = favoriteCounter;

  }

  get template() {
    return createFiltersFilms(this.#counters);
  }
}
