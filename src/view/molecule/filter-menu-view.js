import { createElement, render } from '../../render.js';
import NewMainNavigateItemView from '../atom/main-navigation-item-view.js';

const NAVIGATE_ITEMS = [
  new NewMainNavigateItemView('All movies', '', true),
  new NewMainNavigateItemView('Watchlist', '13'),
  new NewMainNavigateItemView('History', '4'),
  new NewMainNavigateItemView('Favorites', '8'),
];

function createMainNavigate() {
  return '<nav class="main-navigation"></nav>';
}

export default class NewFilterMenuView {
  #element = null;
  #buttons;

  constructor(...buttons) {
    if (!buttons.length) {
      this.#buttons = NAVIGATE_ITEMS;
    } else {
      this.#buttons = [...buttons];
    }
  }

  #getTemplate() {
    return createMainNavigate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
      this.#buttons.forEach((button) => render(button, this.#element));
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
