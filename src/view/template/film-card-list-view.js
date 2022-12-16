import { createElement, render } from '../../render.js';
import NewFilmCardListTitleView from '../atom/film-card-list-title-view.js';
import NewFilmCardListContainerView from '../wrapper/film-card-list-container-view.js';

const BLANK_TITLE = 'All movies. Upcoming';

function createFilmList(extra) {
  const isExtra = `${extra ? ' films-list--extra' : ''}`;
  return `<section class="films-list${isExtra}"></section>`;
}

function createShowMoreButton() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class NewFilmCardListView {
  #element = null;
  #listTitle = BLANK_TITLE;
  #listShowTitle = false;
  #moreButtonShow = false;
  #modeExtra = false;
  #list;

  constructor(...filmList) {
    this.#list = filmList;
  }

  get modeExtra() {
    return this.#modeExtra;
  }

  set modeExtra(newState) {
    this.#modeExtra = newState;
  }

  get buttonShow() {
    return this.#moreButtonShow;
  }

  set buttonShow(state) {
    this.#moreButtonShow = state;
  }

  setTitle(newTitle, newShowStatus) {
    this.#listTitle = newTitle;
    this.#listShowTitle = newShowStatus;
  }

  get template() {
    return createFilmList(this.#modeExtra);
  }

  #addShowMoreButton() {
    return this.element.insertAdjacentElement('beforeend', createElement(createShowMoreButton()));
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      render(new NewFilmCardListTitleView(this.#listTitle, this.#listShowTitle), this.#element);
      render(new NewFilmCardListContainerView(this.#list), this.#element);
      if (!this.#moreButtonShow) {
        this.#addShowMoreButton();
      }
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
