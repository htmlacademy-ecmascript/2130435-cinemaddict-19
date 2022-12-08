import { createElement } from '../../render.js';
import NewSortButtonView from '../atom/sort-buttons.js';

const SORT_BUTTONS = [
  new NewSortButtonView('Sort by default', true).getElement(),
  new NewSortButtonView('Sort by date').getElement(),
  new NewSortButtonView('Sort by rating').getElement()
];

function createSortList() {
  return '<ul class="sort"></ul>';
}

export default class NewSortListView {
  constructor(...buttons) {
    if (!buttons.length) {
      this.buttons = SORT_BUTTONS;
    } else {
      this.buttons = buttons;
    }
  }

  getTemplate() {
    return createSortList();
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
