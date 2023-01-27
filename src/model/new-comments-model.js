import { COMMENTS_LIST_LENGTH } from '../utils/const.js';
import { createMockComment } from '../mocks/comments.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({ length: COMMENTS_LIST_LENGTH }, createMockComment);

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    this.#comments.push(update);
    this._notify(updateType, update);
  }

  #deleteElem(update) {
    const index = this.#comments.findIndex((element) => element.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
  }

  deleteComment(updateType, update) {
    this.#deleteElem(update);
    this._notify(updateType, update);
  }

}
