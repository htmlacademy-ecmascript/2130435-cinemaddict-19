import { remove, render, RenderPosition } from '../framework/render.js';
import { sortFilmDate, sortFilmRating } from '../utils/common.js';
import { ModeRenderList, SortType, UpdateType, UserAction } from '../utils/const.js';
import LoadingView from '../view/loading-view.js';
import SectionFilmsView from '../view/main-films-list/sections/section-films-view.js';
import SortFilmsView from '../view/main-films-list/sort-view.js';
import FilmPresenter from './film-presenter.js';
import filmsFilterPresenter from './films-filters-presenter.js';
import MainFilmsListPresenter from './main-list-presenter.js';
import PopupPresenter from './popup-presenter.js';

const main = document.querySelector('.main');

export default class AppPresenter {
  #place = main;
  #currentSortType = SortType.DEFAULT;

  #filmsModel;
  #commentsModel;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  #popupPresenter = null;
  #filmPresenters = new Map();
  #filtersFilmsPresenter;
  #mainFilmsListPresenter = null;

  #sortFilmsComponent = null;
  #sectionFilmsComponent = null;

  constructor({ filmsModel, commentsModel }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  get films() {
    switch (this.#currentSortType) {
      case (SortType.DATE):
        return [...this.#filmsModel.filmsFilter].sort(sortFilmDate);
      case (SortType.RATING):
        return [...this.#filmsModel.filmsFilter].sort(sortFilmRating);
      default:
        return this.#filmsModel.filmsFilter;
    }
  }

  set films(filmList) {
    this.#filmsModel.films = filmList;
  }

  #clearBoard({resetSortType} = {resetSortType: false}) {
    this.#filmPresenters?.forEach((presenter) => presenter.destroy());
    this.#filmPresenters?.clear();
    this.#mainFilmsListPresenter?.destroy();
    this.#filtersFilmsPresenter?.destroy();
    remove(this.#sortFilmsComponent);
    remove(this.#sectionFilmsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #createFilmPresenter(film) {
    return new FilmPresenter({
      film,
      commentsModel: this.#commentsModel,
      onFilmClick: this.#handleOpenPopup,
      onDataChange: this.#handleViewAction
    });
  }

  #createFilmsPresenters() {
    this.films.forEach((film) => {
      const filmPresenter = this.#createFilmPresenter(film);
      this.#filmPresenters.set(film.id, filmPresenter);
    });
  }

  #createMainFilmsListPresenter() {
    if (this.#mainFilmsListPresenter) {
      return this.#mainFilmsListPresenter;
    }
    this.#mainFilmsListPresenter = new MainFilmsListPresenter({
      filmsPresenters: this.#filmPresenters,
      currentFilterType: this.#filmsModel.filterType
    });
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.OPEN_POPUP:
        this.#commentsModel.getComments(updateType, update);
        break;
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update.comment, update.film);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update.comment, update.film);
        break;
    }
  };

  #handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UpdateType.OPENED_POPUP:
        this.#clearBoard();
        this.#renderBoard(ModeRenderList.UPDATE);
        this.#filmPresenters.get(update.id)?.openPopupHandler();
        break;
      case UpdateType.GET_COMMENT:
        this.#popupPresenter.renderComments(update);
        break;
      case UpdateType.CLOSED_POPUP:
        this.#clearBoard();
        this.#renderBoard(ModeRenderList.UPDATE);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleOpenPopup = (dataCardFilm) => {
    if (this.#popupPresenter) {
      this.#popupPresenter.destroy();
    }

    document.body.classList.add('hide-overflow');
    this.#popupPresenter = new PopupPresenter(dataCardFilm);
    this.#popupPresenter.init();
    return this.#popupPresenter;
  };

  #handleSortTypeChange = (sortTypeValue) => {
    if (this.#currentSortType === sortTypeValue) {
      return;
    }
    this.#currentSortType = sortTypeValue;

    this.#clearBoard();
    this.#renderBoard(ModeRenderList.UPDATE);
  };

  #handleFilterTypeChange = (filterTypeValue) => {
    if (this.#filmsModel.filterType === filterTypeValue) {
      return;
    }
    this.#filmsModel.filterType = filterTypeValue;

    this.#clearBoard({ resetSortType: true });
    this.#renderBoard(ModeRenderList.NEW);
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#sectionFilmsComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    this.#filtersFilmsPresenter = new filmsFilterPresenter({
      films: this.#filmsModel,
      currentFilter:  this.#filmsModel.filterType,
      onFilterChange: this.#handleFilterTypeChange
    });

    this.#filtersFilmsPresenter.init(this.#place);
  }

  #renderSort() {
    this.#sortFilmsComponent = new SortFilmsView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    if (this.#filmPresenters.size) {
      render(this.#sortFilmsComponent, this.#place);
    }
  }

  #getSettingsMainList(mode = ModeRenderList.NEW) {
    return {
      place: this.#sectionFilmsComponent.element,
      filmsPresenters: this.#filmPresenters,
      currentFilterType: this.#filmsModel.filterType,
      mode
    };
  }

  #renderBoard(sortMode) {
    this.#sectionFilmsComponent = new SectionFilmsView();
    this.#createFilmsPresenters();
    this.#renderFilter();
    this.#renderSort();
    render(this.#sectionFilmsComponent, this.#place);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#createMainFilmsListPresenter();


    this.#mainFilmsListPresenter.init(this.#getSettingsMainList(sortMode));
  }

  init() {
    this.#renderBoard();
  }

}
