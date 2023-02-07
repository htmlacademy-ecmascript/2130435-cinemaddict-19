import AbstractView from '../../framework/view/abstract-view.js';
import { FilterType, TypeButton } from '../../utils/const.js';

function filterHTMLAttribute (currentFilter, filterType, isMainNav = true) {
  return `
  <a href="#${filterType}"
  class="main-navigation__item ${
  currentFilter === filterType
    ? 'main-navigation__item--active'
    : '' }"
  data-filter-type=${filterType}>
  ${filterType[0].toUpperCase()}${filterType.substring(1)}
  ${ isMainNav ? '<span class="main-navigation__item-count">' : ''}`;
}

function createFiltersFilms({ watchlist, watched, favorite }, currentFilter) {
  return `
  <nav class="main-navigation">
    ${filterHTMLAttribute(currentFilter, FilterType.ALL, false)} movies</a>
    ${filterHTMLAttribute(currentFilter, FilterType.WATCHLIST)}${watchlist}</span></a>
    ${filterHTMLAttribute(currentFilter, FilterType.HISTORY)}${watched}</span></a>
    ${filterHTMLAttribute(currentFilter, FilterType.FAVORITE)}${favorite}</span></a>
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
