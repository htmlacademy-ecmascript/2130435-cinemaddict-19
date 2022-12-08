import { createElement } from '../../render.js';
import NewFilmCardControlButtonView from '../atom/film-card-control.js';


function createCardFilmControls() {
  return '<div class="film-card__controls"></div>';
}

export default class NewCardFilmControlsView {
  constructor(isWatchList, isWatched, isFavorite) {
    this.watchlist = new NewFilmCardControlButtonView('add-to-watchlist', isWatchList).getElement();
    this.watched = new NewFilmCardControlButtonView('mark-as-watched', isWatched).getElement();
    this.favorite = new NewFilmCardControlButtonView('favorite', isFavorite).getElement();
  }

  getTemplate() {
    return createCardFilmControls();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.insertAdjacentElement('beforeend', this.watchlist);
      this.element.insertAdjacentElement('beforeend', this.watched);
      this.element.insertAdjacentElement('beforeend', this.favorite);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
