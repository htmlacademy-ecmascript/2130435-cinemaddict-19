import { createMockFilm } from '../mocks/films.js';

const FILMS_LIST_LENGTH = 12;

export default class FilmsModel {
  #filmsModel = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);

  constructor() {
    console.log(this.#filmsModel);
  }

}
