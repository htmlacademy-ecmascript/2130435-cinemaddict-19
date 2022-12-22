import { createElement } from '../../render.js';

function createSortButton(name, active) {
  const isActive = `${ active ? ' sort__button--active' : '' }`;
  return `<li><a href="#" class="sort__button${isActive}">${name}</a></li>`;
}

export default class NewSortButtonView {
  #element = null;
  #name;
  #active;

  constructor(name, active) {
    this.#name = name;
    this.#active = active;
  }

  get template() {
    return createSortButton(this.#name, this.#active);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

