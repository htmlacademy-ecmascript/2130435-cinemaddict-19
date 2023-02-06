import AbstractView from '../../framework/view/abstract-view';

function createCommentsWrap(commentsCounter) {
  return `
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${commentsCounter}</span>
    </h3>
   </section>`;
}

export default class CommentsWrapView extends AbstractView {
  #commentsCounter = null;

  constructor({ commentsLength }) {
    super();
    this.#commentsCounter = commentsLength;
  }

  get template() {
    return createCommentsWrap(this.#commentsCounter);
  }
}
