import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { sortFilmDate, sortFilmRating } from '../utils/sort.js';
import {
  MAX_LENGTH_EXTRA_FILM_LIST,
  ModeRenderList,
  Selector,
  SortType,
  START_POSITION,
  TimeLimit,
  TitleList,
  UpdateType,
  UserAction, WINDOW_POPUP_CLASS
} from '../utils/const.js';
import LoadingView from '../view/others/loading-view.js';
import SectionFilmsView from '../view/main-section/sections/section-films-view.js';
import SortFilmsView from '../view/main-section/sort-view.js';
import FilmPresenter from './film-presenter.js';
import filmsFilterPresenter from './films-filters-presenter.js';
import MainFilmsListPresenter from './main-list-presenter.js';
import PopupPresenter from './popup-presenter.js';
import ExtraFilmsListPresenter from './extra-films-list-presenter.js';
import FooterView from '../view/footer/footer-view';
import HeaderView from '../view/header/header-view';

const header = document.querySelector(Selector.HEADER);
const main = document.querySelector(Selector.MAIN);
const footer = document.querySelector(Selector.FOOTER);

export default class AppPresenter {
  #place = main;
  #currentSortType = SortType.DEFAULT;

  #filmsModel;
  #commentsModel;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  #popupPresenter = null;
  #filmsPresenters = new Map();
  #mainFilmsPresenters = new Map();
  #ratedFilmsPresenters = new Map();
  #commentedFilmsPresenters = new Map();
  #filtersFilmsPresenter;

  #mainFilmsListPresenter = null;
  #topRatedFilmsListPresenter = null;
  #mostCommentedFilmsListPresenter = null;

  #sortFilmsComponent = null;
  #sectionFilmsComponent = null;
  #headerComponent = null;
  #footerComponent = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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

  #clearBoard({resetSortType} = {resetSortType: false}) {
    this.#filmsPresenters?.forEach((presenter) => presenter.destroy());
    this.#filmsPresenters?.clear();
    this.#mainFilmsPresenters?.forEach((presenter) => presenter.destroy());
    this.#mainFilmsPresenters?.clear();
    this.#mainFilmsListPresenter?.destroy();
    this.#filtersFilmsPresenter?.destroy();
    remove(this.#sortFilmsComponent);
    remove(this.#sectionFilmsComponent);
    remove(this.#headerComponent);

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
    this.#filmsModel.films.forEach((film) => {
      const filmPresenter = this.#createFilmPresenter(film);
      this.#filmsPresenters.set(film.id, filmPresenter);
    });
  }

  #createMainFilmsPresenters() {
    this.films.forEach((film) => {
      const filmPresenter = this.#createFilmPresenter(film);
      this.#mainFilmsPresenters.set(film.id, filmPresenter);
    });
  }

  #createMainFilmsListPresenter() {
    if (this.#mainFilmsListPresenter) {
      return this.#mainFilmsListPresenter;
    }
    this.#mainFilmsListPresenter = new MainFilmsListPresenter({
      filmsPresenters: this.#mainFilmsPresenters,
      currentFilterType: this.#filmsModel.filterType
    });
  }

  #createCommentedFilmsPresenters() {
    this.#filmsModel.mostCommented.slice(START_POSITION, MAX_LENGTH_EXTRA_FILM_LIST).forEach((film) => {
      const filmPresenter = this.#createFilmPresenter(film);
      this.#commentedFilmsPresenters.set(film.id, filmPresenter);
    });
  }

  #createMostCommentedFilmsListPresenter() {
    if (this.#mostCommentedFilmsListPresenter) {
      return this.#mostCommentedFilmsListPresenter;
    }
    this.#mostCommentedFilmsListPresenter = new ExtraFilmsListPresenter({
      films: this.#commentedFilmsPresenters,
      listTitle: TitleList.COMMENTED
    });
  }

  #createRatedFilmsPresenters() {
    this.#filmsModel.topRated.slice(START_POSITION, MAX_LENGTH_EXTRA_FILM_LIST).forEach((film) => {
      const filmPresenter = this.#createFilmPresenter(film);
      this.#ratedFilmsPresenters.set(film.id, filmPresenter);
    });
  }

  #createTopRatedFilmsListPresenter() {
    if (this.#topRatedFilmsListPresenter) {
      return this.#topRatedFilmsListPresenter;
    }
    this.#topRatedFilmsListPresenter = new ExtraFilmsListPresenter({
      films: this.#ratedFilmsPresenters,
      listTitle: TitleList.RATED
    });
  }

  #createFilmsListsPresenters() {
    this.#createFilmsPresenters();
    this.#createMainFilmsPresenters();
    this.#createRatedFilmsPresenters();
    this.#createCommentedFilmsPresenters();
  }

  #getSettingsMainList(mode = ModeRenderList.NEW) {
    return {
      place: this.#sectionFilmsComponent.element,
      filmsPresenters: this.#mainFilmsPresenters,
      currentFilterType: this.#filmsModel.filterType,
      mode
    };
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.OPEN_POPUP:
        this.#commentsModel.getComments(updateType, update);
        break;
      case UserAction.UPDATE_FILM_CARD:
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch {
          this.#filmsPresenters.get(update.id)?.setUpdateAborting();
        }
        break;
      case UserAction.UPDATE_FILM:
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch {
          this.#popupPresenter.setUpdateAborting();
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#popupPresenter.setAdding();
        try {
          await this.#commentsModel.addComment(updateType, update.comment, update.film);
        } catch {
          this.#popupPresenter.setAddAborting();
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#popupPresenter.setDeleting();
        try {
          await this.#commentsModel.deleteComment(updateType, update.comment, update.film);
        } catch {
          this.#popupPresenter.setDeleteAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = async (updateType, update) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard(ModeRenderList.UPDATE);
        this.#popupPresenter?.updateInformation({ film: update });
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard(ModeRenderList.UPDATE);
        await this.#popupPresenter.renderComments(update);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
        this.#renderBoard();
        this.#renderFooter();
        break;
    }
  };

  #handleOpenPopup = (dataCardFilm) => {
    if (this.#popupPresenter) {
      this.#popupPresenter.destroy();
      this.#popupPresenter = null;
      window.popupScrollPosition = START_POSITION;
    }

    document.body.classList.add(WINDOW_POPUP_CLASS);
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
    this.#renderBoard(ModeRenderList.NEW);
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

  #renderFooter() {
    this.#footerComponent = new FooterView({ allFilmsCounter: this.#filmsPresenters.size });
    render(this.#footerComponent, footer);
  }

  #renderHeader() {
    this.#headerComponent = new HeaderView({ watchedCounter: this.#filmsModel.history });
    render(this.#headerComponent, header);
  }

  #renderSort() {
    this.#sortFilmsComponent = new SortFilmsView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    if (this.#filmsPresenters.size) {
      render(this.#sortFilmsComponent, this.#place);
    }
  }

  #renderFilmsLists(sortMode) {
    this.#createMainFilmsListPresenter();
    this.#createTopRatedFilmsListPresenter();
    this.#createMostCommentedFilmsListPresenter();

    this.#mainFilmsListPresenter.init(this.#getSettingsMainList(sortMode));
    this.#topRatedFilmsListPresenter.init({ place: this.#sectionFilmsComponent.element });
    this.#mostCommentedFilmsListPresenter.init({ place: this.#sectionFilmsComponent.element });
  }

  #renderBoard(sortMode) {
    this.#createFilmsListsPresenters();

    this.#renderHeader();
    this.#sectionFilmsComponent = new SectionFilmsView();
    this.#renderFilter();
    if (this.films.length) {
      this.#renderSort();
    }
    render(this.#sectionFilmsComponent, this.#place);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderFilmsLists(sortMode);
  }

  init() {
    this.#renderBoard();
  }

}
