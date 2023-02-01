import Observable from '../framework/observable.js';
import { createMockFilm } from '../mocks/films.js';

const FILMS_LIST_LENGTH = 12;

function snakeToCamel(str) {
  const regexp = /_+\w/g;
  const transformCamel = (match) => match.slice(1).toUpperCase();
  const newStrCamelCase = str.replace(regexp, transformCamel);
  return newStrCamelCase;
}

export default class FilmsModel extends Observable {
  #films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);
  #filmsApiService = null;

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.films.then((films) => {
      console.log(films);
    });
  }

  get films() {
    return this.#films;
  }

  addFilmComment(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);

    this.#films[filmIndex].comments = [...update.comments];
    this._notify(updateType, update);
  }

  deleteFilmComment(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);
    const commentsList = [...update.comments];

    this.#films[filmIndex].comments = commentsList;
    this._notify(updateType, update);
  }

  updateFilm(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);

    this.#films[filmIndex] = update;
    this._notify(updateType, update);
  }

}
