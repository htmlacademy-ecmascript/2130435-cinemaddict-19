import { createElement } from '../../render.js';

function createFilmSection() {
  return '<section class="films"></section>';
}

export default class NewFilmSection {
  constructor(...filmList) {
    this.lists = [...filmList];
  }

  getTemplate() {
    return createFilmSection();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.lists.forEach((list) => this.element.insertAdjacentElement('beforeend', list.getElement()));
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
