import { createElement } from '../../render.js';

function createFilmListTitle(title, show) {
  const isHidden = `${show ? '' : ' visually-hidden'}`;
  return `<h2 class="films-list__title${isHidden}">${title}</h2>`;
}

export default class NewFilmListTitleView {
  #element = null;
  _title = 'All movies. Upcoming';

  constructor(title, show){
    this._title = title;
    this._show = show;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  #getTemplate() {
    return createFilmListTitle(this.title, this.show);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
