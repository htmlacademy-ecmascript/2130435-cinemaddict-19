import Observable from '../framework/observable.js';
import { createMockFilm } from '../mocks/films.js';
import { FilterType } from '../utils/const.js';

const FILMS_LIST_LENGTH = 12;

export default class FilmsModel extends Observable {
  #films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);
  #currentFilterType = FilterType.ALL;

  get watchlist() {
    return this.films.filter((film) => film.user_details.watchlist).length;
  }

  get history() {
    return this.films.filter((film) => film.user_details.already_watched).length;
  }

  get favorite() {
    return this.films.filter((film) => film.user_details.favorite).length;
  }

  get films() {
    return this.#films;
  }

  get filterType() {
    return this.#currentFilterType;
  }

  set filterType(type) {
    this.#currentFilterType = type;
  }

  get filmsFilter() {
    switch (this.#currentFilterType) {
      case (FilterType.WATCHLIST):
        return this.films.filter((film) => film.user_details.watchlist);
      case (FilterType.HISTORY):
        return this.films.filter((film) => film.user_details.already_watched);
      case (FilterType.FAVORITE):
        return this.films.filter((film) => film.user_details.favorite);
      default:
        return this.films;
    }
  }

  updateFilm(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);
    this.#films[filmIndex] = update;

    this._notify(updateType, update);
  }

}
