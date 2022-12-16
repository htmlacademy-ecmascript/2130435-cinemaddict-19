import { createElement, render } from '../../render.js';

function createFilmPopupTopContainer() {
  return '<div class="film-details__top-container"></div>';
}

function createFilmPopupCloseButton() {
  return `<div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>`;
}

export default class NewFilmPopupTopContainerView {
  #element = null;
  #controlsButtons;
  #infoFilm;

  constructor(controlsButtons, infoFilm) {
    this.#controlsButtons = controlsButtons;
    this.#infoFilm = infoFilm;
  }

  get template() {
    return createFilmPopupTopContainer();
  }

  addClosePopupButton() {
    return this.#element.insertAdjacentElement('beforeend', createElement(createFilmPopupCloseButton()));
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.addClosePopupButton();
      render(this.#infoFilm, this.#element);
      render(this.#controlsButtons, this.#element);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
