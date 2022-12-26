import { createElement } from '../../render.js';
import AbstractView from '../../framework/view/abstract-view';

function createSortButton(name, active) {
  const isActive = `${ active ? ' sort__button--active' : '' }`;
  return `<li><a href="#" class="sort__button${isActive}">${name}</a></li>`;
}

export default class NewSortButtonView extends AbstractView {
  #name;
  #active;

  constructor(name, active) {
    super();
    this.#name = name;
    this.#active = active;
  }

  get template() {
    return createSortButton(this.#name, this.#active);
  }
}

