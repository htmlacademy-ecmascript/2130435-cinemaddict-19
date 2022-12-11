import { createElement } from '../../render.js';

function createMainNavigateItem(name, counter, active) {
  const isActive = `${ active ? ' main-navigation__item--active' : '' }`;
  let counterContainer = '';

  if (counter) {
    counterContainer = `<span class="main-navigation__item-count">${counter}</span></a>`;
  }
  return `<a href="#${name.toLowerCase()}" class="main-navigation__item${isActive}">${name} ${counterContainer}`;
}

export default class NewMainNavigateItemView {
  constructor(name, counter, active) {
    this.name = name;
    this.counter = counter;
    this.active = active;
  }

  getTemplate() {
    return createMainNavigateItem(this.name, this.counter, this.active);
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

