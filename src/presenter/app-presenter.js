import { remove, render } from '../framework/render.js';
import { sortFilmDate, sortFilmRating } from '../utils/common.js';
import { FilterType, SortType, UpdateType, UserAction } from '../utils/const.js';
import SectionFilmsView from '../view/main-films-list/sections/section-films-view.js';
import SortFilmsView from '../view/main-films-list/sort-view.js';
import FilmPresenter from './film-presenter.js';
import filmsFilterPresenter from './films-filters-presenter.js';
import FilmsListPresenter from './films-list-presenter.js';
import PopupPresenter from './popup-presenter.js';

const main = document.querySelector('.main');

export default class AppPresenter {
  #place = main;
  #filmsModel;
  #commentsModel;
  #currentSortType = SortType.DEFAULT;
  #currentFilterType = FilterType.ALL;

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

  #clearBoard({ resetSortType = false } = {}) {
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

  #renderSort() {
    this.#sortFilmsComponent = new SortFilmsView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortFilmsComponent, this.#place);
  }

  #renderFilter() {
    this.#sortFilmsComponent = new SortFilmsView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortFilmsComponent, this.#place);
  }

  #createFilmsPresenters() {
    this.filmsFilter.forEach((film) => {
      const filmPresenter = new FilmPresenter({
        film,
        commentsModel: this.comments,
        onFilmClick: this.#handleOpenPopup,
        onDataChange: this.#handleViewAction
      });
      this.#filmPresenters.set(film.id, filmPresenter);
    });
  }

  #createMainFilmsListPresenter() {
    this.#mainFilmsListPresenter = new FilmsListPresenter({
      place: this.#sectionFilmsComponent.element,
      filmsPresenters: this.#filmPresenters
    });
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(update.comment);
        this.#filmsModel.addFilmComment(updateType, update.film);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(update.comment);
        this.#filmsModel.deleteFilmComment(updateType, update.film);
        break;
    }
  };

  #handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(update.id).init(this.#sectionFilmsComponent.element);
        this.#filtersFilmsPresenter.rerenderFilters();
        this.#popupPresenter?.rerenderFilters();
        this.#popupPresenter?.rerenderComments();
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #handleOpenPopup = (dataCardFilm) => {
    if (this.#popupPresenter) {
      this.#popupPresenter.removePopup();
    }

    document.body.classList.add('hide-overflow');
    this.#popupPresenter = new PopupPresenter(dataCardFilm);
    this.#popupPresenter.init();
  };

  #handleSortTypeChange = (sortTypeValue) => {
    this.#currentSortType = sortTypeValue;

    this.#clearBoard();
    this.#renderBoard();
  };

  #handleFilterTypeChange = (filterTypeValue) => {
    this.#currentFilterType = filterTypeValue;

    this.#clearBoard({ resetSortType: true });
    this.#renderBoard();
  };

  #renderBoard() {
    this.#sectionFilmsComponent = new SectionFilmsView();
    this.#createFilmsPresenters();
    this.#createMainFilmsListPresenter();

    this.#filtersFilmsPresenter = new filmsFilterPresenter({
      films: this.films,
      currentFilter: this.#currentFilterType,
      onFilterChange: this.#handleFilterTypeChange
    });

    this.#filtersFilmsPresenter.init(this.#place);

    if (this.#filmPresenters.size) {
      this.#renderSort();
    }
    render(this.#sectionFilmsComponent, this.#place);

    this.#mainFilmsListPresenter.init();
  }

  init() {
    this.#renderBoard();
  }

}
