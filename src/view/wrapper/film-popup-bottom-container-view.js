import { createElement, render } from '../../render.js';
import NewFilmPopupCommentsCounterView from '../atom/film-popup-comments-counter-view.js';
import NewFilmPopupFormNewCommentView from '../molecule/film-popup-form-new-comment-view.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFilmPopupBottomContainer () {
  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      </section>
    </div>`;
}

export default class NewFilmPopupBottomContainerView extends AbstractView {
  #element = null;
  #commentsList;
  #commentsCounter;

  constructor(commentsList) {
    super();
    this.#commentsList = commentsList;
    this.#commentsCounter = this.#commentsList.commentsLength;
  }

  get template() {
    return createFilmPopupBottomContainer();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      render(new NewFilmPopupCommentsCounterView(this.#commentsCounter), this.#element);
      render(this.#commentsList, this.#element);
      render(new NewFilmPopupFormNewCommentView(), this.#element);
    }
    return this.#element;
  }
}
