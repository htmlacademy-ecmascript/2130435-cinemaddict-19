import { createElement, render } from '../../render.js';
import AbstractView from '../../framework/view/abstract-view.js';
import NewFilmPopupTopContainerView from '../wrapper/film-popup-top-container-view.js';
import NewFilmPopupBottomContainerView from '../wrapper/film-popup-bottom-container-view.js';


function createFilmPopup() {
  return '<section class="film-details"></section>';
}

function createInnerContainer() {
  return '<div class="film-details__inner"></div>';
}

export default class NewFilmPopupView extends AbstractView {
  #element = null;
  #filmsModel;
  #comments;
  #correctFilmPopup;

  #findCorrectFilmPopup = (evt) => {
    const currentId = evt.detail.filmId;
    this.#correctFilmPopup = this.#filmsModel.films.find((film) => film.id === currentId);
  };

  #addContainer(container) {
    return this.element.insertAdjacentElement('beforeend', container);
  }

  constructor(FilmModel, CommentsFilmModel) {
    super();
    this.#filmsModel = FilmModel;
    this.#comments = CommentsFilmModel;
    this.#correctFilmPopup = FilmModel.films[0];

    window.addEventListener('onClickFilmCard', this.#findCorrectFilmPopup);
  }

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

      const topContainerComponent = new NewFilmPopupTopContainerView(this.#correctFilmPopup);
      const bottomContainerComponent = new NewFilmPopupBottomContainerView(this.#correctFilmPopup, this.#comments);

      render(topContainerComponent, innerContainer);
      render(bottomContainerComponent, innerContainer);
    }
    return this.#element;
  }
}
