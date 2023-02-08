import { render, remove } from '../framework/render';
import {FilmsMoreButtonDownloadParameters, ModeRenderList, TitleList} from '../utils/const';
import FilmsListContainerView from '../view/main-section/containers/films-list-container-view';
import SectionFilmsListEmptyView from '../view/main-section/sections/section-films-list-empty-view';
import SectionFilmsListView from '../view/main-section/sections/section-films-list-view';
import ShowMoreButtonView from '../view/main-section/show-more-button-view';

export default class MainFilmsListPresenter {
  #place;
  #isExtra = false;
  #listTitle = TitleList.STANDARD_LIST_TITLE;
  #cardsFilmsPresenters;
  #currentFilterType;

  #start = FilmsMoreButtonDownloadParameters.START;
  #end = FilmsMoreButtonDownloadParameters.START;
  #step = FilmsMoreButtonDownloadParameters.STEP;

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
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick
    });
  }

  #renderCardFilm(film) {
    film.init(this.#filmsListContainerComponent.element);
  }

  #renderCardsFilmsInCurrentRange(mode = ModeRenderList.NEW) {
    switch (mode) {
      case ModeRenderList.NEW:
        this.#end = FilmsMoreButtonDownloadParameters.START;
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
    this.#createShowMoreButton();
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
   * @param {string} currentFilterType Значение текущего выбранного фильтра в приложении
   */
  init({place, mode, filmsPresenters = this.#cardsFilmsPresenters, currentFilterType }) {
    this.#place = place;
    this.#currentFilterType = currentFilterType;
    this.#cardsFilmsPresenters = [...filmsPresenters.values()];
    this.#renderFilmList(mode);
  }

}
