import {createElement, render} from '../../render.js';
import NewFilmCardListTitleView from '../atom/film-card-list-title-view.js';
import NewFilmCardListContainerView from '../wrapper/film-card-list-container-view.js';

const BLANK_TITLE = 'All movies. Upcoming';
const EMPTY_FILM_LIST = 'There are no movies in our database';

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
  #filmCardsDisplay;

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
    return this.#element.insertAdjacentElement('beforeend', createElement(createShowMoreButton()));
  }

  #isFilmListEmpty() {
    if (!this.#list.length && !this.#modeExtra) {
      this.setTitle(EMPTY_FILM_LIST, true);
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.#filmCardsDisplay = new NewFilmCardListContainerView(this.#list);
      if (!this.#list.length) {
        this.#isFilmListEmpty();
      }

      render(new NewFilmCardListTitleView(this.#listTitle, this.#listShowTitle), this.#element);
      render(this.#filmCardsDisplay, this.#element);

      if (!this.#moreButtonShow) {
        this.#addShowMoreButton();
      }
    }

    return this.#element;
  }

  onShowButtonClick = () => {
    const button = this.#element.querySelector('.films-list__show-more');
    button.addEventListener('click', this.#filmCardsDisplay.onShowMoreFilms);
  };

  removeElement() {
    this.#element = null;
  }
}
