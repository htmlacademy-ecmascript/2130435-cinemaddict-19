import { createElement, render } from '../../render.js';
import NewFilmListTitleView from '../atom/film-list-title-view.js';
import NewFilmListContainerView from '../wrapper/film-list-container-view.js';

function createFilmList(extra) {
  const isExtra = `${extra ? ' films-list--extra' : ''}`;
  return `<section class="films-list${isExtra}"></section>`;
}

function createShowMoreButton() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class NewFilmListView {
  listTitle = 'All movies. Upcoming';
  listShowTitle = false;
  moreButtonShow = false;
  modeExtra = false;

  constructor(...filmList) {
    this.list = filmList;
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

  addShowMoreButton() {
    return this.element.insertAdjacentElement('beforeend', createElement(createShowMoreButton()));
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      render (new NewFilmListTitleView(this.listTitle, this.listShowTitle), this.element);
      render (new NewFilmListContainerView(this.list), this.element);
      if (!this.moreButtonShow) {
        this.addShowMoreButton();
      }
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
