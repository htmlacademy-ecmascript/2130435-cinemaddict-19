import { createElement, render } from '../../framework/render.js';
import AbstractView from '../../framework/view/abstract-view.js';
import NewFilmPopupTopContainerView from '../wrapper/film-popup-top-container-view.js';
import NewFilmPopupBottomContainerView from '../wrapper/film-popup-bottom-container-view.js';
import { isEscape } from '../../utils.js';


function createFilmPopup() {
  return '<section class="film-details"></section>';
}

function createInnerContainer() {
  return '<div class="film-details__inner"></div>';
}

export default class NewFilmPopupView extends AbstractView {
  #element = null;
  #comments;
  #correctFilmPopup;

  #addContainer(container) {
    return this.element.insertAdjacentElement('beforeend', container);
  }

  constructor({ correctFilm, commentsFilm, removePopup, changeButtonState }) {
    super();
    this.#comments = commentsFilm;
    this.#correctFilmPopup = correctFilm;
    this.removePopup = removePopup.bind(this);

    this.toggleState = changeButtonState;

    document.addEventListener('keydown', this.#onEscapeKeydown);
  }

  #onEscapeKeydown = (evt) => {
    if (isEscape(evt)) {
      this.removePopup();
      document.removeEventListener('keydown', this.#onEscapeKeydown);
    }
  };

  get inner() {
    return createInnerContainer();
  }

  get template() {
    return createFilmPopup();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      const innerContainer = createElement(this.inner);

      this.#addContainer(innerContainer);

      const topContainerComponent = new NewFilmPopupTopContainerView(this.#correctFilmPopup,this.removePopup, this.toggleState);
      const bottomContainerComponent = new NewFilmPopupBottomContainerView(this.#correctFilmPopup, this.#comments);

      render(topContainerComponent, innerContainer);
      render(bottomContainerComponent, innerContainer);
    }
    return this.#element;
  }
}
