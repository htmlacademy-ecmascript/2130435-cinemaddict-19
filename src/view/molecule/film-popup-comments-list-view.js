import { createElement, render } from '../../render.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFilmPopupCommentsList() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class NewFilmPopupCommentsListView extends AbstractView {
  #element = null;
  #comments;

  constructor(...comments) {
    super();
    this.#comments = [...comments];
  }

  get commentsLength() {
    return this.#comments.length;
  }

  get template() {
    return createFilmPopupCommentsList();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.#comments.forEach((comment) => render(comment, this.#element));
    }
    return this.#element;
  }
}
