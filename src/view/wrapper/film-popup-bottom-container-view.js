import { createElement, render } from '../../render.js';
import NewFilmPopupCommentsCounterView from '../atom/film-popup-comments-counter-view.js';
import NewFilmPopupFormNewCommentView from '../molecule/film-popup-form-new-comment-view.js';
import AbstractView from '../../framework/view/abstract-view.js';
import NewFilmPopupCommentView from '../atom/film-popup-comment-view.js';
import NewFilmPopupCommentsListView from '../molecule/film-popup-comments-list-view.js';

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
  #correctFilm;
  #correctComments;

  constructor(correctFilm, commentsList) {
    super();
    this.#commentsList = commentsList;

    this.#correctFilm = correctFilm;
    this.#correctComments = new NewFilmPopupCommentsListView(...this.#getCommentsListComponents());
    this.#commentsCounter = this.#correctComments.commentsLength;
  }

  #findCommentsByFilm() {
    return this.#commentsList.filter((comment) => this.#correctFilm.comments.some((item) => item === comment.id));
  }

  #getCommentsListComponents() {
    return this.#findCommentsByFilm().map((comment) => new NewFilmPopupCommentView(comment));
  }

  get template() {
    return createFilmPopupBottomContainer();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      const commentCounterComponent = new NewFilmPopupCommentsCounterView(this.#commentsCounter);
      render(commentCounterComponent, this.#element);
      render(this.#correctComments, this.#element);
      render(new NewFilmPopupFormNewCommentView(), this.#element);
    }
    return this.#element;
  }
}
