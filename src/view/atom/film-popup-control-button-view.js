import { createElement } from '../../render.js';

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

export default class NewFilmPopupControlButtonView {
  constructor(type, active) {
    this.type = type;
    this.active = active;
  }

  setActiveState(newState = this.active) {
    this.active = newState;
  }

  getTemplate() {
    return createFilmPopupControlButton(this.type, this.active);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
