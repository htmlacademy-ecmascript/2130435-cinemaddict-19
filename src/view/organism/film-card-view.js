import { createElement, render } from '../../render.js';
import NewFilmCardDescriptionView from '../atom/film-card-description-view.js';
import NewFilmCardControlsView from '../molecule/film-card-controls-view.js';

function createFilmCard() {
  return '<article class="film-card"></article>';
}

export default class NewFilmCardView {
  #element = null;
  #cardFilmModel;

  constructor(CardFilmModel) {
    this.#cardFilmModel = CardFilmModel;
  }

  get card() {
    return this.#cardFilmModel;
  }

  #getTemplate() {
    return createFilmCard();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
      render(new NewFilmCardDescriptionView(this.card), this.#element);
      render(new NewFilmCardControlsView(this.card.user_details), this.#element);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

