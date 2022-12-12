import { TypeButton } from '../../const.js';
import { createElement, render } from '../../render.js';
import NewFilmCardControlButtonView from '../atom/film-card-control-button-view.js';


function createCardFilmControls() {
  return '<div class="film-card__controls"></div>';
}

export default class NewFilmCardControlsView {
  constructor({ watchlist, already_watched: alreadyWatched, favorite }) {
    this.watchlistComponent = new NewFilmCardControlButtonView(`add-to-${TypeButton.WATCHLIST}`, watchlist);
    this.watchedComponent = new NewFilmCardControlButtonView(`mark-as-${TypeButton.WATCHED}`, alreadyWatched);
    this.favoriteComponent = new NewFilmCardControlButtonView(TypeButton.FAVORITE, favorite);
  }

  getTemplate() {
    return createCardFilmControls();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      render(this.watchlistComponent, this.element);
      render(this.watchedComponent, this.element);
      render(this.favoriteComponent, this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
