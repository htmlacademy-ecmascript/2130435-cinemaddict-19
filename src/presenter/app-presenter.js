import { render } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import SectionFilmsView from '../view/main-films-list/sections/section-films-view.js';
import SortFilmsView from '../view/main-films-list/sort-view.js';
import FilmPresenter from './film-presenter.js';
import filmsFilterPresenter from './films-filters-presenter.js';
import FilmsListPresenter from './films-list-presenter.js';
import PopupPresenter from './new-popup-film.js';

const main = document.querySelector('.main');

export default class AppPresenter {
  #place = main;
  #filmsModel;
  #commentsModel;

  #popupPresenter = null;
  #filmPresenters = new Map();
  #filtersFilmsPresenter;

  #sortFilmsComponent = new SortFilmsView();
  #sectionFilmsComponent = new SectionFilmsView();

  #mainFilmsListPresenter = null;

  constructor({ filmsModel, commentsModel }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  get films() {
    /*
    1. Add sort with help [ switch(currentSortType) | case(SortType.TYPE) ]
    => case : return [...this.#filmsModel.films].sort(sortFunctionForSortType)
    */
    return this.#filmsModel.films;
  }

  set films(filmList) {
    this.#filmsModel.films = filmList;
  }

  #handleFilmChange = (updateFilm) => {
    this.#filmPresenters.get(updateFilm.id).init();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update.comment);
        this.#filmsModel.addFilmComment(updateType, update.film);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update.comment);
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
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #createFilmsPresenters() {
    this.films.forEach((film) => {
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

  init() {
    this.#createFilmsPresenters();
    this.#createMainFilmsListPresenter();

    this.#filtersFilmsPresenter = new filmsFilterPresenter({
      films: this.films,
      onDataChange: this.#handleViewAction
    });
    this.#filtersFilmsPresenter.init(this.#place);

    if (this.#filmPresenters.size) {
      render(this.#sortFilmsComponent, this.#place);
    }
    render(this.#sectionFilmsComponent, this.#place);

    this.#mainFilmsListPresenter.init();
  }

  #handleOpenPopup = (dataCardFilm) => {
    if (this.#popupPresenter) {
      this.#popupPresenter.removePopup();
    }

    document.body.classList.add('hide-overflow');
    this.#popupPresenter = new PopupPresenter(dataCardFilm);
    this.#popupPresenter.init();
  };
}
