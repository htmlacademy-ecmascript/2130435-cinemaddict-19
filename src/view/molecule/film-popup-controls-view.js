import { createElement, render } from '../../render.js';
import NewFilmPopupControlButtonView from '../atom/film-popup-control-button-view.js';

const TypeButton = {
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITE: 'favorite'
};

function createCardFilmControls() {
  return '<section class="film-details__controls"></section>';
}

export default class NewFilmPopupControlsView {
  constructor({ userDetails }) {
    this.watchlist = new NewFilmPopupControlButtonView(TypeButton.WATCHLIST, userDetails.watchlist);
    this.watched = new NewFilmPopupControlButtonView(TypeButton.WATCHED, userDetails.alreadyWatched);
    this.favorite = new NewFilmPopupControlButtonView(TypeButton.FAVORITE, userDetails.favorite);
  }

  getTemplate() {
    return createCardFilmControls();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      render(this.watchlist, this.element);
      render(this.watched, this.element);
      render(this.favorite, this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
