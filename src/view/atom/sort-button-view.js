import { createElement } from '../../render.js';

function createSortButton(name, active) {
  const isActive = `${ active ? ' sort__button--active' : '' }`;
  return `<li><a href="#" class="sort__button${isActive}">${name}</a></li>`;
}

export default class NewSortButtonView {
  constructor(name, active) {
    this.name = name;
    this.active = active;
  }

  getTemplate() {
    return createSortButton(this.name, this.active);
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

