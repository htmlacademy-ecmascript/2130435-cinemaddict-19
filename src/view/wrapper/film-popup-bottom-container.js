import { createElement, render } from '../../render.js';
import NewFilmPopupCommentsCounter from '../atom/film-popup-comments-counter.js';
import NewFormPopupNewCommentView from '../molecule/form-popup-new-comment.js';

function createFilmPopupBottomContainer () {
  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      </section>
    </div>`;
}

export default class NewFilmPopupBottomContainer {
  constructor(commentsList) {
    this.commentsList = commentsList;
    this.commentsCounter = this.commentsList.getCommentsLength();
  }

  getTemplate() {
    return createFilmPopupBottomContainer();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      render(new NewFilmPopupCommentsCounter(this.commentsCounter), this.element);
      render(this.commentsList, this.element);
      render(new NewFormPopupNewCommentView(), this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
