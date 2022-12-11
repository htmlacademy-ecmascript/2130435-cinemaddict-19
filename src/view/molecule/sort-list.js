import { createElement, render } from '../../render.js';
import NewSortButtonView from '../atom/sort-buttons.js';

const SORT_BUTTONS = [
  new NewSortButtonView('Sort by default', true),
  new NewSortButtonView('Sort by date'),
  new NewSortButtonView('Sort by rating')
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
      this.buttons.forEach((button) => render(button, this.element));
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
