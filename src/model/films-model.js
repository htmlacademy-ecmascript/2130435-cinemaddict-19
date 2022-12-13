import { createMockFilm } from '../mocks/films.js';
import { getRandomElementArray } from '../utils.js';

const FILMS_LIST_LENGTH = 6;

export default class FilmsModel {
  #films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);

  get films() {
    return this.#films;
  }

  getFilmsForExtraMode() {
    return [getRandomElementArray(this.#films), getRandomElementArray(this.#films)];
  }

  getFilmForPopup() {
    return getRandomElementArray(this.#films);
  }
}
