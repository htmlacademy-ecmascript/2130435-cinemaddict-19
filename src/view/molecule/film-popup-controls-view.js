import { TypeButton } from '../../const.js';
import { createElement, render } from '../../render.js';
import NewFilmPopupControlButtonView from '../atom/film-popup-control-button-view.js';


function createCardFilmControls() {
  return '<section class="film-details__controls"></section>';
}

export default class NewFilmPopupControlsView {
  #element = null;
  #watchlistComponent;
  #watchedComponent;
  #favoriteComponent;

  constructor({ user_details: userDetails }) {
    this.#watchlistComponent = new NewFilmPopupControlButtonView(TypeButton.WATCHLIST, userDetails.watchlist);
    this.#watchedComponent = new NewFilmPopupControlButtonView(TypeButton.WATCHED, userDetails.already_watched);
    this.#favoriteComponent = new NewFilmPopupControlButtonView(TypeButton.FAVORITE, userDetails.favorite);
  }

  #getTemplate() {
    return createCardFilmControls();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
      render(this.#watchlistComponent, this.#element);
      render(this.#watchedComponent, this.#element);
      render(this.#favoriteComponent, this.#element);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
