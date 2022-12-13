import { createElement, render } from '../../render.js';


function createFilmPopup() {
  return '<section class="film-details"></section>';
}

function createInnerContainer() {
  return '<div class="film-details__inner"></div>';
}

export default class NewFilmPopupView {
  #element = null;
  #topContainer;
  #bottomContainer;

  constructor(topContainer, bottomContainer) {
    this.#topContainer = topContainer;
    this.#bottomContainer = bottomContainer;
  }

  #getTemplate() {
    return createFilmPopup();
  }

  #getInner() {
    return createInnerContainer();
  }

  #addContainer(container) {
    return this.element.insertAdjacentElement('beforeend', container);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
      const innerContainer = createElement(this.#getInner());
      this.#addContainer(innerContainer);
      render(this.#topContainer, innerContainer);
      render(this.#bottomContainer, innerContainer);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
