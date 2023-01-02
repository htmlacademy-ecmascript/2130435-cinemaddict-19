import { createElement, render } from '../../framework/render.js';
import AbstractView from '../../framework/view/abstract-view';
import NewFilmPopupDetailsInfoView from '../atom/film-popup-details-info-view.js';
import NewFilmPopupControlsView from '../molecule/film-popup-controls-view.js';

function createFilmPopupTopContainer() {
  return '<div class="film-details__top-container"></div>';
}

function createFilmPopupCloseButton() {
  return `<div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>`;
}

export default class NewFilmPopupTopContainerView extends AbstractView {
  #element = null;

  #onCloseButtonClick;

  #correctFilmPopup;
  #popupTopContainerInfoComponent;
  #popupTopContainerControlsComponent;

  constructor(correctFilmPopup, removePopup) {
    super();
    this.#correctFilmPopup = correctFilmPopup;
    this.#popupTopContainerInfoComponent = new NewFilmPopupDetailsInfoView(this.#correctFilmPopup);
    this.#popupTopContainerControlsComponent = new NewFilmPopupControlsView(this.#correctFilmPopup);
    this.#onCloseButtonClick = removePopup;

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onCloseButtonClick);
  }

  #addClosePopupButton() {
    return this.#element.insertAdjacentElement('beforeend', createElement(createFilmPopupCloseButton()));
  }

  get template() {
    return createFilmPopupTopContainer();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);

      this.#addClosePopupButton();

      render(this.#popupTopContainerInfoComponent, this.#element);
      render(this.#popupTopContainerControlsComponent, this.#element);
    }
    return this.#element;
  }
}
