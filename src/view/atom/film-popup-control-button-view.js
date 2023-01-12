import { createElement } from '../../framework/render.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFilmPopupControlButton(type, active) {
  try {
    const typeButton = {
      'watchlist': 'Add to watchlist',
      'watched': 'Already watched',
      'favorite': 'Add to favorites'
    };
    const button = typeButton[String(type).toLowerCase()];

    if (!button) {
      throw new Error('Incorrect type in createFilmPopupControlButton(type)');
    }

    const isActive = `${ active ? ' film-details__control-button--active' : ''}`;

    return `<button  class="film-details__control-button film-details__control-button--${type}${isActive}" type="button" id="${type}" name="${type}">${button}</button>`;
  }

  catch(err) {
    return err.message;
  }
}

export default class NewFilmPopupControlButtonView extends AbstractView{
  #type;
  #element = null;

  constructor(type, active, cb) {
    super();
    this.#type = type;
    this._active = active;
    this.toggleState = cb;
  }

  get active() {
    return this._active;
  }

  set active(newState) {
    this._active = newState;
  }

  get template() {
    return createFilmPopupControlButton(this.#type, this.active);
  }

  toggleButtonState = () => {
    this.#element.classList.toggle('film-details__control-button--active');
    if (this.#type === 'watched') {
      this.toggleState('already_watched');
    } else {
      this.toggleState(this.#type);
    }
  };

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.#element.addEventListener('click', this.toggleButtonState);
    }

    return this.#element;
  }
}
