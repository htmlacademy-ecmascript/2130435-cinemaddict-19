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
  constructor(controlsButtons, infoFilm) {
    this.controlsButtons = controlsButtons;
    this.infoFilm = infoFilm;
  }

  getTemplate() {
    return createFilmPopupTopContainer();
  }

  addClosePopupButton() {
    return this.element.insertAdjacentElement('beforeend', createElement(createFilmPopupCloseButton()));
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.addClosePopupButton();
      render(this.infoFilm, this.element);
      render(this.controlsButtons, this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
