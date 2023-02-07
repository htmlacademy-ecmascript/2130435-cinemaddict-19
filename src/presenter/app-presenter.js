import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { sortFilmDate, sortFilmRating } from '../utils/sort.js';
import { ModeRenderList, SortType, TitleList, UpdateType, UserAction } from '../utils/const.js';
import LoadingView from '../view/others/loading-view.js';
import SectionFilmsView from '../view/main-section/sections/section-films-view.js';
import SortFilmsView from '../view/main-section/sort-view.js';
import FilmPresenter from './film-presenter.js';
import filmsFilterPresenter from './films-filters-presenter.js';
import MainFilmsListPresenter from './main-list-presenter.js';
import PopupPresenter from './popup-presenter.js';
import ExtraFilmsListPresenter from './extra-films-list-presenter.js';

const main = document.querySelector('.main');
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class AppPresenter {
  #place = main;
  #currentSortType = SortType.DEFAULT;

  #filmsModel;
  #commentsModel;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  #popupPresenter = null;
  #filmPresenters = new Map();
  #ratedFilmPresenters = new Map();
  #commentedFilmPresenters = new Map();
  #filtersFilmsPresenter;

  #mainFilmsListPresenter = null;
  #topRatedFilmsListPresenter = null;
  #mostCommentedFilmsListPresenter = null;

  #sortFilmsComponent = null;
  #sectionFilmsComponent = null;

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

  set films(filmList) {
    this.#filmsModel.films = filmList;
  }

  #clearBoard({resetSortType} = {resetSortType: false}) {
    this.#filmPresenters?.forEach((presenter) => presenter.destroy());
    this.#filmPresenters?.clear();
    this.#mainFilmsListPresenter?.destroy();
    this.#filtersFilmsPresenter?.destroy();
    // this.#popupPresenter?.destroy();
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

  #createRatedFilmsPresenters() {
    this.#filmsModel.topRated.slice(0, 2).forEach((film) => {
      const filmPresenter = this.#createFilmPresenter(film);
      this.#ratedFilmPresenters.set(film.id, filmPresenter);
    });
  }

  #createCommentedFilmsPresenters() {
    this.#filmsModel.mostCommented.slice(0, 2).forEach((film) => {
      const filmPresenter = this.#createFilmPresenter(film);
      this.#commentedFilmPresenters.set(film.id, filmPresenter);
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

  #createTopRatedFilmsListPresenter() {
    if (this.#topRatedFilmsListPresenter) {
      return this.#topRatedFilmsListPresenter;
    }
    this.#topRatedFilmsListPresenter = new ExtraFilmsListPresenter({
      films: this.#ratedFilmPresenters,
      listTitle: TitleList.RATED
    });
  }

  #createMostCommentedFilmsListPresenter() {
    if (this.#mostCommentedFilmsListPresenter) {
      return this.#mostCommentedFilmsListPresenter;
    }
    this.#mostCommentedFilmsListPresenter = new ExtraFilmsListPresenter({
      films: this.#commentedFilmPresenters,
      listTitle: TitleList.COMMENTED
    });
  }

  #createFilmsListsPresenters() {
    this.#createFilmsPresenters();
    this.#createRatedFilmsPresenters();
    this.#createCommentedFilmsPresenters();
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
          this.#filmPresenters.get(update.id)?.setUpdateAborting();
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
      case UpdateType.OPENED_POPUP:
        this.#clearBoard();
        this.#renderBoard(ModeRenderList.UPDATE);
        this.#filmPresenters.get(update.id)?.openPopupHandler();
        break;
      case UpdateType.GET_COMMENT:
        await this.#popupPresenter.renderComments(update);
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

    this.#sectionFilmsComponent = new SectionFilmsView();
    this.#renderFilter();
    this.#renderSort();
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
