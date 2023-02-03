import { UpdateType } from '../utils/const.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #commentsApiService;

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  set comments(newComments) {
    this.#comments = newComments;
  }

  async getComments(updateType, film) {
    try {
      const response = await this.#commentsApiService.getComments(film);
      this.comments = response;
      this._notify(updateType, this.comments);
    } catch (err) {
      this.comments = [];
    }
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

  async addComment(updateType, comment, film) {
    comment.date.toISOString();
    try {
      const response = await this.#commentsApiService.addComment(film, comment);
      this.#comments = [...this.#comments, response];
      this._notify(updateType, this.#comments);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  deleteComment(updateType, comment, film) {
    this.#deleteElem(film, comment);
    this._notify(updateType, film);
  }

}
