import AbstractView from '../../framework/view/abstract-view.js';

function createMainNavigateItem(name, counter, active) {
  const isActive = `${ active ? ' main-navigation__item--active' : '' }`;
  let counterContainer = '';

  if (counter) {
    counterContainer = `<span class="main-navigation__item-count">${counter}</span></a>`;
  }
  return `<a href="#${name.toLowerCase()}" class="main-navigation__item${isActive}">${name} ${counterContainer}`;
}

export default class NewMainNavigateItemView extends AbstractView {
  #name;
  #counter;
  #active;

  constructor(name, counter, active) {
    super();
    this.#name = name;
    this.#counter = counter;
    this.#active = active;
  }

  get template() {
    return createMainNavigateItem(this.#name, this.#counter, this.#active);
  }
}

