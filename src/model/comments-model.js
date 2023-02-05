import { COMMENTS_LIST_LENGTH } from '../utils/const.js';
import { createMockComment } from '../mocks/comments.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({ length: COMMENTS_LIST_LENGTH }, createMockComment);

  get comments() {
    return this.#comments;
  }

  #deleteElem(film, comment) {
    const index = this.#comments.findIndex((element) => element.id === comment.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    const indexFilm = film.comments.findIndex((id) => id === comment.id);
    film.comments = [
      ...film.comments.slice(0, indexFilm),
      ...film.comments.slice(indexFilm + 1)
    ];
  }

  addComment(updateType, comment, film) {
    this.#comments.push(comment);
    film.comments.push(comment.id);
    this._notify(updateType, film);
  }

  deleteComment(updateType, comment, film) {
    this.#deleteElem(film, comment);
    this._notify(updateType, film);
  }

}
