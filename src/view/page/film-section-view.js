import { createElement, render } from '../../render.js';

function createFilmSection() {
  return '<section class="films"></section>';
}

export default class NewFilmSectionView {
  #element = null;
  #lists;

  constructor(...filmList) {
    this.#lists = [...filmList];
  }

  get template() {
    return createFilmSection();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.#lists.forEach((list) => render(list, this.#element));
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
