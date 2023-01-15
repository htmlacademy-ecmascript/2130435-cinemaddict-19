import { createElement, render } from '../../framework/render.js';
import NewFilmCardDescriptionView from '../atom/film-card-description-view.js';
import NewFilmCardControlsView from '../molecule/film-card-controls-view.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFilmCard() {
  return '<article class="film-card"></article>';
}

export default class NewFilmCardView extends AbstractView {
  #element = null;
  #cardFilmModel;

  constructor(correctFilmFromFilmsModel) {
    super();
    this.#cardFilmModel = correctFilmFromFilmsModel;
  }

  #createClickFilmCardEvent = () => {
    const clickFilmCardEvent = new CustomEvent('onClickFilmCard', {
      detail: {
        filmId: this.#cardFilmModel.id
      }
    });
    window.dispatchEvent(clickFilmCardEvent);
  };

  get card() {
    return this.#cardFilmModel;
  }

  get template() {
    return createFilmCard();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      render(new NewFilmCardDescriptionView(this.card), this.#element);
      render(new NewFilmCardControlsView(this.card.user_details), this.#element);
      this.#element.addEventListener('click', this.#createClickFilmCardEvent);
    }
    return this.#element;
  }
}

