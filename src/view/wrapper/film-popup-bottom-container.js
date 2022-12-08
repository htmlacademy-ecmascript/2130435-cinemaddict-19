import { createElement } from '../../render.js';
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
      this.element.insertAdjacentElement('beforeend', new NewFilmPopupCommentsCounter(this.commentsCounter).getElement());
      this.element.insertAdjacentElement('beforeend', this.commentsList.getElement());
      this.element.insertAdjacentElement('beforeend', new NewFormPopupNewCommentView().getElement());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
