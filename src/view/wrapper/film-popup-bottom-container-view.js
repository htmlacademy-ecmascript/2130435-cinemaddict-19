import { createElement, render } from '../../render.js';
import NewFilmPopupCommentsCounterView from '../atom/film-popup-comments-counter-view.js';
import NewFilmPopupFormNewCommentView from '../molecule/film-popup-form-new-comment-view.js';

function createFilmPopupBottomContainer () {
  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      </section>
    </div>`;
}

export default class NewFilmPopupBottomContainerView {
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
      render(new NewFilmPopupCommentsCounterView(this.commentsCounter), this.element);
      render(this.commentsList, this.element);
      render(new NewFilmPopupFormNewCommentView(), this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
