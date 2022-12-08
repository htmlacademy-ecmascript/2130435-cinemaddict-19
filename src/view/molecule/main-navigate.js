import { createElement } from '../../render.js';
import NewMainNavigateItemView from '../atom/main-navigation-item.js';

const NAVIGATE_ITEMS = [
  new NewMainNavigateItemView('All movies', '', true).getElement(),
  new NewMainNavigateItemView('Watchlist', '13').getElement(),
  new NewMainNavigateItemView('History', '4').getElement(),
  new NewMainNavigateItemView('Favorites', '8').getElement(),
];

function createMainNavigate() {
  return '<nav class="main-navigation"></nav>';
}

export default class NewFilterMenuView {
  constructor(...buttons) {
    if (!buttons.length) {
      this.buttons = NAVIGATE_ITEMS;
    } else {
      this.buttons = [...buttons];
    }
  }

  getTemplate() {
    return createMainNavigate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.buttons.forEach((button) => this.element.insertAdjacentElement('beforeend', button));
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
