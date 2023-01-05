import { createElement, render } from '../../framework/render.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFilmSection() {
  return '<section class="films"></section>';
}

export default class NewFilmSectionView extends AbstractView {
  #element = null;
  #lists;

  constructor(...filmList) {
    super();
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
}
