import { createElement, render } from '../../render.js';
import NewFilmPopupControlButtonView from '../atom/film-popup-control.js';


function createCardFilmControls() {
  return '<section class="film-details__controls"></section>';
}

export default class NewPopupFilmControlsView {
  constructor({ userDetails }) {
    this.watchlist = new NewFilmPopupControlButtonView('watchlist', userDetails.watchlist);
    this.watched = new NewFilmPopupControlButtonView('watched', userDetails.alreadyWatched);
    this.favorite = new NewFilmPopupControlButtonView('favorite', userDetails.favorite);
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
