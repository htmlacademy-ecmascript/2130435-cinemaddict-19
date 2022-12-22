import { createMockFilm } from '../mocks/films.js';
import { getRandomElementArray } from '../utils.js';

const FILMS_LIST_LENGTH = 12;

export default class FilmsModel {
  #films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);

  get films() {
    return this.#films;
  }

  get twoFilms() {
    return [getRandomElementArray(this.#films), getRandomElementArray(this.#films)];
  }

  get film() {
    return getRandomElementArray(this.#films);
  }
}
