import { createElement } from '../../render.js';

function createFilmListTitle(title, show) {
  const isHidden = `${show ? '' : ' visually-hidden'}`;
  return `<h2 class="films-list__title${isHidden}">${title}</h2>`;
}

export default class NewFilmCardListTitleView {
  #element = null;
  _title = 'All movies. Upcoming';

  //title = NewFilmCardListView.#listTitle; show = NewFilmCardListView.#listShowTitle : boolean;
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

  get template() {
    return createFilmListTitle(this.title, this.show);
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
