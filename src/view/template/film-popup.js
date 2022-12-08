import { createElement } from '../../render.js';


function createFilmPopup() {
  return `<section class="film-details">
  <div class="film-details__inner"></div>
  </section>`;
}

export default class NewFilmPopupView {
  constructor(topContainer, bottomContainer) {
    this.topContainer = topContainer;
    this.bottomContainer = bottomContainer;
  }

  getTemplate() {
    return createFilmPopup();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.insertAdjacentElement('beforeend', this.topContainer.getElement());
      this.element.insertAdjacentElement('beforeend', this.bottomContainer.getElement());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
