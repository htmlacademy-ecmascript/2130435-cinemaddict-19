import { createElement, render } from '../../render.js';
import NewFilmPopupCloseButtonView from '../atom/film-popup-close-button';

function createFilmPopupTopContainer() {
  return '<div class="film-details__top-container"></div>';
}

export default class NewFilmPopupTopContainer {
  constructor(controlsButtons, infoFilm) {
    this.controlsButtons = controlsButtons;
    this.infoFilm = infoFilm;
  }

  getTemplate() {
    return createFilmPopupTopContainer();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      render(new NewFilmPopupCloseButtonView(), this.element);
      render(this.infoFilm, this.element);
      render(this.controlsButtons, this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
