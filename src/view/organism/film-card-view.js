import { createElement, render } from '../../render.js';
import NewFilmCardDescriptionView from '../atom/film-card-description-view.js';
import NewFilmCardControlsView from '../molecule/film-card-controls-view.js';

function createFilmCard() {
  return '<article class="film-card"></article>';
}

export default class NewFilmCardView {
  constructor(CardFilmModel) {
    this.CardFilmModel = CardFilmModel;
  }

  getTemplate() {
    return createFilmCard();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      render(new NewFilmCardDescriptionView(this.CardFilmModel), this.element);
      render(new NewFilmCardControlsView(this.CardFilmModel.userDetails), this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

