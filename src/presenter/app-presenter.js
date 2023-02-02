import { remove, render, RenderPosition } from '../framework/render.js';
import { sortFilmDate, sortFilmRating } from '../utils/common.js';
import { FilterType, ModeRenderList, SortType, UpdateType, UserAction } from '../utils/const.js';
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
  #currentFilterType = FilterType.ALL;

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
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  get films() {
    switch (this.#currentSortType) {
      case (SortType.DATE):
        return [...this.#filmsModel.films].sort(sortFilmDate);
      case (SortType.RATING):
        return [...this.#filmsModel.films].sort(sortFilmRating);
    }
    return this.#filmsModel.films;
  }

  set films(filmList) {
    this.#filmsModel.films = filmList;
  }

  get filmsFilter() {
    switch (this.#currentFilterType) {
      case (FilterType.WATCHLIST):
        return this.films.filter((film) => film.user_details.watchlist);
      case (FilterType.HISTORY):
        return this.films.filter((film) => film.user_details.already_watched);
      case (FilterType.FAVORITE):
        return this.films.filter((film) => film.user_details.favorite);
    }
    return this.films;
  }

  #clearBoard({resetSortType} = {resetSortType: false}) {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#mainFilmsListPresenter.destroy();
    this.#filtersFilmsPresenter.destroy();
    remove(this.#sortFilmsComponent);
    remove(this.#sectionFilmsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #createFilmPresenter(film) {
    return new FilmPresenter({
      film,
      commentsModel: this.comments,
      onFilmClick: this.#handleOpenPopup,
      onDataChange: this.#handleViewAction
    });
  }

  #createFilmsPresenters() {
    this.filmsFilter.forEach((film) => {
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
      currentFilterType: this.#currentFilterType
    });
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(update.comment);
        this.#filmsModel.changeFilmComment(updateType, update.film);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(update.comment);
        this.#filmsModel.changeFilmComment(updateType, update.film);
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
      case UpdateType.CLOSED_POPUP:
        this.#clearBoard();
        this.#renderBoard(ModeRenderList.UPDATE);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    if (this.#currentFilterType === filterTypeValue) {
      return;
    }
    this.#currentFilterType = filterTypeValue;

    this.#clearBoard({ resetSortType: true });
    this.#renderBoard(ModeRenderList.NEW);
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#place, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    this.#filtersFilmsPresenter = new filmsFilterPresenter({
      films: this.films,
      currentFilter: this.#currentFilterType,
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
      currentFilterType: this.#currentFilterType,
      mode
    };
  }

  #renderBoard(sortMode) {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#sectionFilmsComponent = new SectionFilmsView();
    this.#createFilmsPresenters();
    this.#createMainFilmsListPresenter();

    this.#renderFilter();
    this.#renderSort();

    render(this.#sectionFilmsComponent, this.#place);
    this.#mainFilmsListPresenter.init(this.#getSettingsMainList(sortMode));
  }

  init() {
    this.#renderBoard();
  }

}
