import { TypeButton } from '../../const.js';
import AbstractView from '../../framework/view/abstract-view.js';

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

export default class NewFilmCardControlButtonView extends AbstractView{
  #type;
  #active;

  /**
   * @param {string} type Текстовое название кнопки. Должно соотвествовать одному из названий watchlist | watched | favorite
   * @param {boolean} active Состояние кнопки
   */
  constructor(type, active) {
    super();
    this.#type = type;
    this.#active = active;
  }

  get template() {
    return createFilmCardControlButton(this.#type, this.#active);
  }
}
