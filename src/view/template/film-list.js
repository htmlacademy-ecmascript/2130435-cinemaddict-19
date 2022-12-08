import { createElement } from '../../render.js';
import NewFilmListTitle from '../atom/film-list-title.js';
import NewShowMoreButtonView from '../atom/show-more-button.js';
import NewFilmListContainerView from '../wrapper/film-list-container.js';

function createFilmList(extra) {
  const isExtra = `${extra ? ' films-list--extra' : ''}`;
  return `<section class="films-list${isExtra}"></section>`;
}

export default class NewFilmListView {
  constructor(...filmList) {
    this.list = [...filmList];
    this.listTitle = 'All movies. Upcoming';
    this.listShowTitle = false;
    this.moreButtonShow = false;
    this.modeExtra = false;
  }

  setModeExtra(newState) {
    this.modeExtra = newState;
  }

  setMoreButtonShow(state) {
    this.moreButtonShow = state;
  }

  setTitle(newTitle, newShowStatus) {
    this.listTitle = newTitle;
    this.listShowTitle = newShowStatus;
  }

  getTemplate() {
    return createFilmList(this.modeExtra);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.insertAdjacentElement('beforeend', new NewFilmListTitle(this.listTitle, this.listShowTitle).getElement());
      this.element.insertAdjacentElement('beforeend', new NewFilmListContainerView(this.list).getElement());
      if (!this.moreButtonShow) {
        this.element.insertAdjacentElement('beforeend', new NewShowMoreButtonView().getElement());
      }
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}