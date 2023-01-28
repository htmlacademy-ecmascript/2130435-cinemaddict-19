import Observable from '../framework/observable.js';
import { createMockFilm } from '../mocks/films.js';

const FILMS_LIST_LENGTH = 12;

export default class FilmsModel extends Observable {
  #films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);

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
    const commentsList = [
      ...update.comments
    ];

    this.#films[filmIndex].comments = commentsList;
    this._notify(updateType, update);
  }

  updateFilm(updateType, update) {
    const filmIndex = this.#films.findIndex((film) => film.id === update.id);

    this.#films[filmIndex] = update;
    this._notify(updateType, update);
  }

}
