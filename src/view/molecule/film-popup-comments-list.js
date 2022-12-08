import { createElement } from '../../render.js';

function createFilmPopupCommentsList() {
  return '<ul class="film-details__comments-list"></ul>';
}

export default class NewFilmPopupCommentsList {
  constructor(...comments) {
    this.comments = [...comments];
  }

  getCommentsLength() {
    return this.comments.length;
  }

  getTemplate() {
    return createFilmPopupCommentsList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.comments.forEach((comment) => this.element.insertAdjacentElement('beforeend', comment.getElement()));
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
