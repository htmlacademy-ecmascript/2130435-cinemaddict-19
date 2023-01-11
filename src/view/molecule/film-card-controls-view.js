import { TypeButton } from '../../const.js';
import { createElement, render } from '../../framework/render.js';
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

  /**
   * @param {object} FilmModel.user_details
   * @param {boolean} FilmModel.user_details.watchlist состояние кнопки
   * @param {boolean} FilmModel.user_details.already_watched состояние кнопки
   * @param {boolean} FilmModel.user_details.favorite состояние кнопки
   */
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
