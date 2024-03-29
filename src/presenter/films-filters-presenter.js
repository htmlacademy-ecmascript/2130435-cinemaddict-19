import { remove, render } from '../framework/render';
import FiltersFilmsView from '../view/main-section/filters-view';

export default class filmsFilterPresenter {
  #films;
  #currentFilter;
  #handleFilterChange;

  #watchListCounter;
  #watchedCounter;
  #favoriteCounter;

  #filmsFilterComponent = null;

  constructor({ films, currentFilter, onFilterChange }) {
    this.#films = films;
    this.#handleFilterChange = onFilterChange;
    this.#currentFilter = currentFilter;

    this.#watchListCounter = this.#films.watchlist;
    this.#watchedCounter = this.#films.history;
    this.#favoriteCounter = this.#films.favorite;
  }

  #createFilterFilmsComponent () {
    this.#filmsFilterComponent = new FiltersFilmsView({
      watchListCounter: this.#watchListCounter,
      watchedCounter: this.#watchedCounter,
      favoriteCounter: this.#favoriteCounter,
      currentFilter: this.#currentFilter,
      onFilterChange: this.#handleFilterChange
    });
  }

  #renderFilmsFilter(place) {
    this.#createFilterFilmsComponent();
    render(this.#filmsFilterComponent, place);
  }

  destroy() {
    remove(this.#filmsFilterComponent);
  }

  init(place) {
    this.#renderFilmsFilter(place);
  }

}
