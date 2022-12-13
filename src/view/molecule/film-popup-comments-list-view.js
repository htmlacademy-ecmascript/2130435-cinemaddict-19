import { createElement, render } from '../../render.js';

function createFilmPopupCommentsList() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class NewFilmPopupCommentsList {
  #element = null;
  #comments;

  constructor(...comments) {
    this.#comments = [...comments];
  }

  get commentsLength() {
    return this.#comments.length;
  }

  #getTemplate() {
    return createFilmPopupCommentsList();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
      this.#comments.forEach((comment) => render(comment, this.#element));
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
