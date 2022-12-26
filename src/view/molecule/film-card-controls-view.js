import { TypeButton } from '../../const.js';
import { createElement, render } from '../../render.js';
import NewFilmCardControlButtonView from '../atom/film-card-control-button-view.js';
import AbstractView from '../../framework/view/abstract-view.js';


function createCardFilmControls() {
  return '<div class="film-card__controls"></div>';
}

export default class NewFilmCardControlsView extends AbstractView {
  #element = null;
  #watchlistComponent;
  #watchedComponent;
  #favoriteComponent;

  // Дуструктуризация FilmModel.user_details
  constructor({ watchlist, already_watched: alreadyWatched, favorite }) {
    super();
    this.#watchlistComponent = new NewFilmCardControlButtonView(`add-to-${TypeButton.WATCHLIST}`, watchlist);
    this.#watchedComponent = new NewFilmCardControlButtonView(`mark-as-${TypeButton.WATCHED}`, alreadyWatched);
    this.#favoriteComponent = new NewFilmCardControlButtonView(TypeButton.FAVORITE, favorite);
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
