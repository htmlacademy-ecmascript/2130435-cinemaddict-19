import AbstractView from '../../framework/view/abstract-view.js';

function createFilmPopupCommentsCounter(value) {
  let commentsCounter = 'Comment';
  if (Number(value) > 1) {
    commentsCounter = 'Comments';
  }
  return `<h3 class="film-details__comments-title">${commentsCounter} <span class="film-details__comments-count">${value}</span></h3>`;
}

export default class NewFilmPopupCommentsCounterView extends AbstractView {
  #value;

  /**
   * @param {number} value Длина массива данных с комментариями
   */
  constructor(value) {
    super();
    this.#value = value;
  }

  get template() {
    return createFilmPopupCommentsCounter(this.#value);
  }
}
