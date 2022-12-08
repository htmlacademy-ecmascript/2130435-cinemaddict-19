import { createElement } from '../../render.js';
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
      this.element.insertAdjacentElement('beforeend', new NewFilmPopupCloseButtonView().getElement());
      this.element.insertAdjacentElement('beforeend', this.infoFilm.getElement());
      this.element.insertAdjacentElement('beforeend', this.controlsButtons.getElement());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
