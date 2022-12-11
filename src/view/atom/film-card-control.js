import { createElement } from '../../render.js';

function createFilmCardControlButton(type, active) {
  try {
    const typeButton = {
      'add-to-watchlist': 'Add to watchlist',
      'mark-as-watched': 'Mark as watched',
      'favorite': 'Mark as favorite'
    };
    const button = typeButton[String(type).toLowerCase()];

    if (!button) {
      throw new Error('Incorrect type in createFilmCardControlButton(type)');
    }

    const isActive = `${ active ? ' film-card__controls-item--active' : ''}`;

    return `<button class="film-card__controls-item film-card__controls-item--${type}${isActive}" type="button">${button}</button>`;
  }

  catch(err) {
    return err.message;
  }
}

export default class NewFilmCardControlButtonView {
  constructor(type, active) {
    this.type = type;
    this.active = active;
  }

  setActiveState(newState = this.active) {
    this.active = newState;
  }

  getTemplate() {
    return createFilmCardControlButton(this.type, this.active);
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
