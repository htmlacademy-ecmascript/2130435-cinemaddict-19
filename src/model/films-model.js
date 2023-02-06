import Observable from '../framework/observable.js';
import { FilterType, UpdateType } from '../utils/const.js';
import { sortMostCommented, sortTopRated } from '../utils/sort.js';

// function snakeToCamel(str) {
//   const regexp = /_+\w/g;
//   const transformCamel = (match) => match.slice(1).toUpperCase();
//   const newStrCamelCase = str.replace(regexp, transformCamel);
//   return newStrCamelCase;
// }

export default class FilmsModel extends Observable {
  #films = [];
  #filmsApiService = null;
  #currentFilterType = FilterType.ALL;


  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;
  }

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

  get topRated() {
    return this.films.filter((film) => film.film_info.total_rating).sort(sortTopRated);
  }

  get mostCommented() {
    return this.films.filter((film) => film.comments.length).sort(sortMostCommented);
  }

  async updateFilm(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);
    try {
      const response = await this.#filmsApiService.updateFilm(update);
      this.#films[filmIndex] = response;
      this._notify(updateType, response);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  async init() {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films;
    } catch(err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  }

}
