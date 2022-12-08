import { createElement } from '../../render.js';
import NewFilmPopupControlButtonView from '../atom/film-popup-control.js';


function createCardFilmControls() {
  return '<section class="film-details__controls"></section>';
}

export default class NewPopupFilmControlsView {
  constructor(isWatchList = false, isWatched = false, isFavorite = false) {
    this.watchlist = new NewFilmPopupControlButtonView('watchlist', isWatchList);
    this.watched = new NewFilmPopupControlButtonView('watched', isWatched);
    this.favorite = new NewFilmPopupControlButtonView('favorite', isFavorite);
  }

  getTemplate() {
    return createCardFilmControls();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.insertAdjacentElement('beforeend', this.watchlist.getElement());
      this.element.insertAdjacentElement('beforeend', this.watched.getElement());
      this.element.insertAdjacentElement('beforeend', this.favorite.getElement());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
