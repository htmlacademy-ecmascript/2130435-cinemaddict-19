import { createElement } from '../../render.js';

function createFilmPopupCloseButton() {
  return `<div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>`;
}

export default class NewFilmPopupCloseButtonView {
  getTemplate() {
    return createFilmPopupCloseButton();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
