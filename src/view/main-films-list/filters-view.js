import AbstractView from '../../framework/view/abstract-view.js';
import { FilterType, TypeButton } from '../../utils/const.js';

function createFiltersFilms({ watchlist, watched, favorite }, currentFilter) {
  return `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${currentFilter === FilterType.ALL ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.ALL}>All movies</a>
    <a href="#watchlist" class="main-navigation__item ${currentFilter === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item ${currentFilter === FilterType.HISTORY ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.HISTORY}>History <span class="main-navigation__item-count">${watched}</span></a>
    <a href="#favorites" class="main-navigation__item ${currentFilter === FilterType.FAVORITE ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.FAVORITE}>Favorites <span class="main-navigation__item-count">${favorite}</span></a>
  </nav>`;
}

export default class FiltersFilmsView extends AbstractView {
  #counters = {};
  #currentFilter;
  #handleFilterTypeChange = null;

  constructor({ watchListCounter, watchedCounter, favoriteCounter, onFilterChange, currentFilter }) {
    super();
    this.#counters[TypeButton.WATCHLIST] = watchListCounter;
    this.#counters[TypeButton.WATCHED] = watchedCounter;
    this.#counters[TypeButton.FAVORITE] = favoriteCounter;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersFilms(this.#counters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
