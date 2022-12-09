import { createElement, render } from '../../render.js';


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
      render(this.topContainer, this.element);
      render(this.bottomContainer, this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
