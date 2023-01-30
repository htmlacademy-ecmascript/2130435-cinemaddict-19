import { render, remove } from '../framework/render.js';
import FilmsListContainerView from '../view/main-films-list/containers/films-list-container-view.js';
import SectionFilmsListEmptyView from '../view/main-films-list/sections/section-films-list-empty-view.js';
import SectionFilmsListView from '../view/main-films-list/sections/section-films-list-view.js';
import ShowMoreButtonView from '../view/main-films-list/show-more-button-view.js';

const STANDARD_LIST_TITLE = 'All movies. Upcoming';
const START_ELEMENT = 0;
const STEP_PER_LOAD_MORE_FILMS = 5;

export default class FilmsListPresenter {
  #place;
  #isExtra;
  #listTitle;
  #cardsFilmsPresenters;
  #currentFilterType;

  #start = START_ELEMENT;
  #step = STEP_PER_LOAD_MORE_FILMS;

  #sectionFilmsListComponent;
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = null;

  #emptyListComponent = null;

  /**
   * @param {HTMLElement} place Место добавления объекта управления презентером
   * @param {boolean} isExtra Это экстра раздел?
   * @param {string} listTitle Название раздела
   * @param {collection} filmsCardsPresenter Презентер карточек фильма? Пока не нужен
   */
  constructor({ place, isExtra = false, listTitle = STANDARD_LIST_TITLE, filmsPresenters, currentFilterType }) {
    this.#place = place; //this.#sectionFilmsComponent.element
    this.#isExtra = isExtra;
    this.#cardsFilmsPresenters = [...filmsPresenters.values()];
    this.#listTitle = listTitle;
    this.#currentFilterType = currentFilterType;

    this.#sectionFilmsListComponent = this.#createSectionFilmList();
    this.#showMoreButtonComponent = this.#createShowMoreButton();
  }

  #createSectionFilmList() {
    return new SectionFilmsListView({
      isExtra: this.#isExtra,
      listTitle: this.#listTitle
    });
  }

  #createShowMoreButton() {
    return new ShowMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick
    });
  }

  #renderCardFilm(film) {
    film.init(this.#filmsListContainerComponent.element);
  }

  #renderCardsFilmsInCurrentRange() {
    this.#cardsFilmsPresenters
      .slice(this.#start, this.#start += this.#step)
      .forEach((film) => this.#renderCardFilm(film));
  }

  #renderEmptyList() {
    this.#emptyListComponent = new SectionFilmsListEmptyView(this.#currentFilterType);
    render(this.#emptyListComponent, this.#place);
  }

  #renderFilmListContainers() {
    render(this.#sectionFilmsListComponent, this.#place);
    render(this.#filmsListContainerComponent, this.#sectionFilmsListComponent.element);
  }

  #renderShowMoreButton() {
    if (this.#start < this.#cardsFilmsPresenters.length) {
      render(this.#showMoreButtonComponent, this.#sectionFilmsListComponent.element);
    }
  }

  #renderFilmList() {
    if (this.#isExtra && !this.#cardsFilmsPresenters.length) {
      return;
    } else if (!this.#cardsFilmsPresenters.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderFilmListContainers();

    if (this.#isExtra) {
      // Тут должны быть списки экстра-классов. Доделать в 8 модуле.
      this.#cardsFilmsPresenters[0].init(this.#filmsListContainerComponent.element);
      this.#cardsFilmsPresenters[1].init(this.#filmsListContainerComponent.element);
    } else {
      this.#renderCardsFilmsInCurrentRange();
      this.#renderShowMoreButton();
    }
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderCardsFilmsInCurrentRange();
    if (this.#start >= this.#cardsFilmsPresenters.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  //Пересобираю
  #renderList() {
    const filmCount = this.#cardsFilmsPresenters.length;

    if (!filmCount) {
      this.#renderEmptyList();
    }

    render(this.#sectionFilmsListComponent, this.#place);
    render(this.#filmsListContainerComponent, this.#sectionFilmsListComponent.element);

  }

  destroy() {
    this.#start = START_ELEMENT;
    remove(this.#sectionFilmsListComponent);
    remove(this.#filmsListContainerComponent);
    remove(this.#showMoreButtonComponent);
  }

  init() {
    this.#renderFilmList();
  }
}
