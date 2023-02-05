import { render, remove } from '../framework/render.js';
import { ModeRenderList } from '../utils/const.js';
import FilmsListContainerView from '../view/main-films-list/containers/films-list-container-view.js';
import SectionFilmsListEmptyView from '../view/main-films-list/sections/section-films-list-empty-view.js';
import SectionFilmsListView from '../view/main-films-list/sections/section-films-list-view.js';
import ShowMoreButtonView from '../view/main-films-list/show-more-button-view.js';

const STANDARD_LIST_TITLE = 'All movies. Upcoming';
const START_ELEMENT = 0;
const STEP_PER_LOAD_MORE_FILMS = 5;

export default class MainFilmsListPresenter {
  #place;
  #isExtra = false;
  #listTitle = STANDARD_LIST_TITLE;
  #cardsFilmsPresenters;
  #currentFilterType;

  #start = START_ELEMENT;
  #end = START_ELEMENT;
  #step = STEP_PER_LOAD_MORE_FILMS;

  #sectionFilmsListComponent;
  #filmsListContainerComponent;
  #showMoreButtonComponent = null;

  #emptyListComponent = null;

  constructor({ filmsPresenters }) {
    this.#cardsFilmsPresenters = [...filmsPresenters.values()];
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

  #renderCardsFilmsInCurrentRange(mode = ModeRenderList.NEW) {
    switch (mode) {
      case ModeRenderList.NEW:
        this.#end = START_ELEMENT;
        this.#cardsFilmsPresenters
          .slice(this.#start, this.#end += this.#step)
          .forEach((film) => this.#renderCardFilm(film));
        break;
      case ModeRenderList.UPDATE:
        this.#cardsFilmsPresenters
          .slice(this.#start, this.#end)
          .forEach((film) => this.#renderCardFilm(film));
        break;
      case ModeRenderList.LOAD:
        this.#cardsFilmsPresenters
          .slice(this.#start, this.#end += this.#step)
          .forEach((film) => this.#renderCardFilm(film));
        break;
    }
  }

  #renderEmptyList() {
    this.#emptyListComponent = new SectionFilmsListEmptyView(this.#currentFilterType);
    render(this.#emptyListComponent, this.#place);
  }

  #renderFilmListContainers() {
    this.#filmsListContainerComponent = new FilmsListContainerView();
    this.#sectionFilmsListComponent = this.#createSectionFilmList();
    render(this.#sectionFilmsListComponent, this.#place);
    render(this.#filmsListContainerComponent, this.#sectionFilmsListComponent.element);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = this.#createShowMoreButton();
    if (this.#end < this.#cardsFilmsPresenters.length) {
      render(this.#showMoreButtonComponent, this.#sectionFilmsListComponent.element);
    }
  }

  #renderFilmList(mode) {
    const filmCount = this.#cardsFilmsPresenters.length;
    if (!filmCount) {
      this.#renderEmptyList();
    }

    this.#renderFilmListContainers();
    this.#renderCardsFilmsInCurrentRange(mode);
    this.#renderShowMoreButton();
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderCardsFilmsInCurrentRange(ModeRenderList.LOAD);
    if (this.#end >= this.#cardsFilmsPresenters.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  destroy() {
    remove(this.#sectionFilmsListComponent);
    remove(this.#filmsListContainerComponent);
    remove(this.#showMoreButtonComponent);
    this.#cardsFilmsPresenters = null;
  }

  /**
   * @param {HTMLElement} place Место рендера списка
   * @param {string} mode Режим отрисовки карточек фильмов. По умолчанию отрисовка первого ряда элементов.
   * @param {Map} filmsPresenters Презентеры фильмов. По умолчанию список при создании объекта
   */
  init({place, mode, filmsPresenters = this.#cardsFilmsPresenters, currentFilterType }) {
    this.#place = place;
    this.#currentFilterType = currentFilterType;
    this.#cardsFilmsPresenters = [...filmsPresenters.values()];
    this.#renderFilmList(mode);
  }

}
