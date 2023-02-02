import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

function snakeToCamel(str) {
  const regexp = /_+\w/g;
  const transformCamel = (match) => match.slice(1).toUpperCase();
  const newStrCamelCase = str.replace(regexp, transformCamel);
  return newStrCamelCase;
}

export default class FilmsModel extends Observable {
  #films = [];
  #filmsApiService = null;

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get films() {
    return this.#films;
  }

  async changeFilmComment(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      this.#films[filmIndex].comments = [...response.comments];
      this._notify(updateType, response);
    } catch(err) {
      throw new Error('Can\'t update change list comments by film');
    }

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
