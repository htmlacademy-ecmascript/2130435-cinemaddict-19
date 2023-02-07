import Observable from '../framework/observable.js';
import {FilterType, UpdateType} from '../utils/const.js';
import {sortMostCommented, sortTopRated} from '../utils/sort.js';
import {Filter} from '../utils/filter';
import {adaptiveToApp} from '../utils/adaptive';

export default class FilmsModel extends Observable {
  #films = [];
  #filmsApiService = null;
  #currentFilterType = FilterType.ALL;

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get watchlist() {
    return this.films.filter(Filter[FilterType.WATCHLIST]).length;
  }

  get history() {
    return this.films.filter(Filter[FilterType.HISTORY]).length;
  }

  get favorite() {
    return this.films.filter(Filter[FilterType.FAVORITE]).length;
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
      case (FilterType.HISTORY):
      case (FilterType.FAVORITE):
        return this.films.filter(Filter[this.#currentFilterType]);
      default:
        return this.films;
    }
  }

  get topRated() {
    return this.films.filter(Filter[FilterType.TOP_RATING]).sort(sortTopRated);
  }

  get mostCommented() {
    return this.films.filter(Filter[FilterType.MOST_COMMENTED]).sort(sortMostCommented);
  }

  async updateFilm(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);
    try {
      const response = await this.#filmsApiService.updateFilm(update);
      this.#films[filmIndex] = adaptiveToApp(response);
      this._notify(updateType, adaptiveToApp(response));
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  async init() {
    try {
      const response = await this.#filmsApiService.films;
      this.#films = response.map(adaptiveToApp);
    } catch(err) {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
  }

}
