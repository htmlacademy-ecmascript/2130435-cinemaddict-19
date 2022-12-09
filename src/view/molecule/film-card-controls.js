import { createElement } from '../../render.js';
import NewFilmCardControlButtonView from '../atom/film-card-control.js';


function createCardFilmControls() {
  return '<div class="film-card__controls"></div>';
}

export default class NewCardFilmControlsView {
  constructor({ watchlist, alreadyWatched, favorite }) {
    this.watchlistComponent = new NewFilmCardControlButtonView('add-to-watchlist', watchlist);
    this.watchedComponent = new NewFilmCardControlButtonView('mark-as-watched', alreadyWatched);
    this.favoriteComponent = new NewFilmCardControlButtonView('favorite', favorite);
  }

  getTemplate() {
    return createCardFilmControls();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.insertAdjacentElement('beforeend', this.watchlistComponent.getElement());
      this.element.insertAdjacentElement('beforeend', this.watchedComponent.getElement());
      this.element.insertAdjacentElement('beforeend', this.favoriteComponent.getElement());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
