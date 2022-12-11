import { createElement } from '../../render.js';

function createFilmListTitle(title, show) {
  const isHidden = `${show ? '' : ' visually-hidden'}`;
  return `<h2 class="films-list__title${isHidden}">${title}</h2>`;
}

export default class NewFilmListTitleView {
  constructor(title = 'All movies. Upcoming', show){
    this.title = title;
    this.show = show;
  }

  getTemplate() {
    return createFilmListTitle(this.title, this.show);
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
