import { createMockFilm } from '../mocks/films.js';

const FILMS_LIST_LENGTH = 6;

export default class FilmsModel {
  films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);

  getFilms() {
    return this.films;
  }
}
