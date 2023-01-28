import { remove, render, replace } from '../framework/render.js';
import FiltersFilmsView from '../view/main-films-list/filters-view.js';

const START = 0;

export default class filmsFilterPresenter {
  #films;
  #watchListCounter;
  #watchedCounter;
  #favoriteCounter;

  #currentFilter;
  #handleFilterChange;

  #filmsFilterComponent = null;

  constructor({ films, currentFilter, onFilterChange }) {
    this.#films = films;
    this.#handleFilterChange = onFilterChange;
    this.#currentFilter = currentFilter;
  }

  #calculateFilterValueCounter() {
    this.#resetCounters();
    this.#films.forEach((film) => this.#getFilterValueCounter(film));
  }

  #resetCounters() {
    this.#watchListCounter = START;
    this.#watchedCounter = START;
    this.#favoriteCounter = START;
  }

  #getFilterValueCounter(film) {
    if (film.user_details.watchlist) {
      this.#watchListCounter++;
    }
    if (film.user_details.already_watched) {
      this.#watchedCounter++;
    }
    if (film.user_details.favorite) {
      this.#favoriteCounter++;
    }
  }

  #createFilterFilmsView () {
    return new FiltersFilmsView({
      watchListCounter: this.#watchListCounter,
      watchedCounter: this.#watchedCounter,
      favoriteCounter: this.#favoriteCounter,
      currentFilter: this.#currentFilter,
      onFilterChange: this.#handleFilterChange
    });
  }

  destroy() {
    remove(this.#filmsFilterComponent);
  }

  rerenderFilters() {
    this.#calculateFilterValueCounter();
    const updateFilters = this.#createFilterFilmsView();
    replace(updateFilters, this.#filmsFilterComponent);
    this.#filmsFilterComponent = updateFilters;
  }

  init(place) {
    this.#calculateFilterValueCounter();
    this.#filmsFilterComponent = this.#createFilterFilmsView();

    render(this.#filmsFilterComponent, place);
  }

}
