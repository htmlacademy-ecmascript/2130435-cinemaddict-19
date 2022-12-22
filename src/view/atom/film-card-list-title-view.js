import { createElement } from '../../render.js';

function createFilmListTitle(title, show) {
  const isHidden = `${show ? '' : ' visually-hidden'}`;
  return `<h2 class="films-list__title${isHidden}">${title}</h2>`;
}

export default class NewFilmCardListTitleView {
  #element = null;

  //title = NewFilmCardListView.#listTitle; show = NewFilmCardListView.#listShowTitle : boolean;
  constructor(title, show){
    this.title = title;
    this.show = show;
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
