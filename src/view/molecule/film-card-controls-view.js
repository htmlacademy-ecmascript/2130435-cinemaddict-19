import { createElement, render } from '../../render.js';
import NewFilmCardControlButtonView from '../atom/film-card-control-button-view.js';

const TypeButton = {
  WATCHLIST: 'add-to-watchlist',
  WATCHED: 'mark-as-watched',
  FAVORITE: 'favorite'
};

function createCardFilmControls() {
  return '<div class="film-card__controls"></div>';
}

export default class NewFilmCardControlsView {
  constructor({ watchlist, alreadyWatched, favorite }) {
    this.watchlistComponent = new NewFilmCardControlButtonView(TypeButton.WATCHLIST, watchlist);
    this.watchedComponent = new NewFilmCardControlButtonView(TypeButton.WATCHED, alreadyWatched);
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
