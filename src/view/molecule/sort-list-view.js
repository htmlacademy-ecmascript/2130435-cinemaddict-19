import { createElement, render } from '../../render.js';
import NewSortButtonView from '../atom/sort-button-view.js';
import AbstractView from '../../framework/view/abstract-view.js';

const SORT_BUTTONS = [
  new NewSortButtonView('Sort by default', true),
  new NewSortButtonView('Sort by date'),
  new NewSortButtonView('Sort by rating')
];

function createSortList() {
  return '<ul class="sort"></ul>';
}

export default class NewSortListView extends AbstractView{
  #element = null;
  #buttons;

  constructor(...buttons) {
    super();
    this.#buttons = buttons;
    if (!buttons.length) {
      this.#buttons = SORT_BUTTONS;
    }
  }

  get template() {
    return createSortList();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.#buttons.forEach((button) => render(button, this.#element));
    }
    return this.#element;
  }
}
