import { TypeButton } from '../../const.js';
import { createElement, render } from '../../framework/render.js';
import NewFilmPopupControlButtonView from '../atom/film-popup-control-button-view.js';
import AbstractView from '../../framework/view/abstract-view.js';


function createCardFilmControls() {
  return '<section class="film-details__controls"></section>';
}

export default class NewFilmPopupControlsView extends AbstractView {
  #element = null;
  #watchlistComponent;
  #watchedComponent;
  #favoriteComponent;

  constructor({ user_details: userDetails }) {
    super();
    this.#watchlistComponent = new NewFilmPopupControlButtonView(TypeButton.WATCHLIST, userDetails.watchlist);
    this.#watchedComponent = new NewFilmPopupControlButtonView(TypeButton.WATCHED, userDetails.already_watched);
    this.#favoriteComponent = new NewFilmPopupControlButtonView(TypeButton.FAVORITE, userDetails.favorite);
  }

  get template() {
    return createCardFilmControls();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      render(this.#watchlistComponent, this.#element);
      render(this.#watchedComponent, this.#element);
      render(this.#favoriteComponent, this.#element);
    }
    return this.#element;
  }
}
