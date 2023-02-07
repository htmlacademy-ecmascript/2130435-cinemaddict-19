import AbstractView from '../../framework/view/abstract-view.js';
import { SortType } from '../../utils/const.js';

function sortHTMLAttribute (currentSortType, sortType) {
  return `
  <li><a href="#" class="sort__button ${
  currentSortType === sortType
    ? 'sort__button--active'
    : ''}"
    data-sort-type="${sortType}">
  `;
}

function createSortFilms(currentSortType) {
  return `
  <ul class="sort">
    ${sortHTMLAttribute(currentSortType, SortType.DEFAULT)}Sort by default</a></li>
    ${sortHTMLAttribute(currentSortType, SortType.DATE)}Sort by date</a></li>
    ${sortHTMLAttribute(currentSortType, SortType.RATING)}Sort by rating</a></li>
  </ul>`;
}

export default class SortFilmsView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortFilms(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}

