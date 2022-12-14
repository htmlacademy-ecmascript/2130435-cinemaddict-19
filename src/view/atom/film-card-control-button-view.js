import { TypeButton } from '../../const.js';
import { createElement } from '../../render.js';


function createFilmCardControlButton(type, active) {
  try {
    const typeButton = {
      [`add-to-${TypeButton.WATCHLIST}`]: 'Add to watchlist',
      [`mark-as-${TypeButton.WATCHED}`]: 'Mark as watched',
      [`${TypeButton.FAVORITE}`]: 'Mark as favorite'
    };
    const button = typeButton[String(type).toLowerCase()];
    const isActive = `${ active ? ' film-card__controls-item--active' : ''}`;

    if (button) {
      return `<button class="film-card__controls-item film-card__controls-item--${type}${isActive}" type="button">${button}</button>`;
    }

    throw new Error('Incorrect type in createFilmCardControlButton(type)');
  }
  catch(err) {
    return err.message;
  }
}

export default class NewFilmCardControlButtonView {
  #element = null;

  // type = FilmModel.user_details.[watchlist / watching_date / favorite]
  // active : boolean
  constructor(type, active) {
    this._type = type;
    this._active = active;
  }

  get active() {
    return this._active;
  }

  set active(newState = this._active) {
    this._active = newState;
  }

  get type() {
    return this._type;
  }

  #getTemplate() {
    return createFilmCardControlButton(this.type, this.active);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
