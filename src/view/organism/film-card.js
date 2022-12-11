import { createElement, render } from '../../render.js';
import NewCardFilmDescriptionView from '../atom/film-description.js';
import NewCardFilmControlsView from '../molecule/film-card-controls.js';

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
      render(new NewCardFilmDescriptionView(this.CardFilmModel), this.element);
      render(new NewCardFilmControlsView(this.CardFilmModel.userDetails), this.element);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

