import { render, replace } from '../framework/render.js';
import FooterView from '../view/footer/footer-view.js';
import HeaderView from '../view/header/header-view.js';
import FiltersFilmsView from '../view/main-films-list/filters-view.js';
import SectionFilmsView from '../view/main-films-list/sections/section-films-view.js';
import SortFilmsView from '../view/main-films-list/sort-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmsListPresenter from './films-list-presenter.js';
import PopupPresenter from './popup-presenter.js';

const ListsTitles = {
  COMMENTED: 'Most commented',
  RATED: 'Top rated'
};

export default class MainPresenter {
  #popupPresenter = null;

  #cardFilmPresenters = new Map();

  #films;
  #filmsModel;
  #commentsModel;

  #header;
  #main;
  #footer;

  #headerComponent = new HeaderView();
  #footerComponent = new FooterView();

  #filtersFilmsComponent;
  #sortFilmsComponent = new SortFilmsView();
  #sectionFilmsComponent = new SectionFilmsView();

  #mainFilmsListPresenter = null;
  #topRatedFilmsListPresenter = null;
  #mostCommentedFilmsListPresenter = null;

  constructor({header, main, footer, filmsModel, commentsModel}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#filmsModel = filmsModel;
    this.#films = filmsModel.films;
    this.#commentsModel = commentsModel.comments;
  }

  #findCommentsByFilm(film) {
    return this.#commentsModel.slice().filter((comment) => film.comments.some((filmId) => filmId === comment.id));
  }

  #setFilmsCardsPresenters() {
    this.#films.forEach((film) => {
      const filmCardPresenter = new FilmCardPresenter({
        currentFilmModel: film,
        currentComments: this.#findCommentsByFilm(film),
        initPopup: this.#initPopup,
        updateFilter: this.#updateFilters
      });
      this.#cardFilmPresenters.set(film.id, filmCardPresenter);
    });
  }

  #createMainFilmsListPresenter() {
    this.#mainFilmsListPresenter = new FilmsListPresenter({
      place: this.#sectionFilmsComponent.element,
      filmsCardsPresenters: this.#cardFilmPresenters
    });
  }

  #createTopRatedFilmsListPresenter() {
    this.#topRatedFilmsListPresenter = new FilmsListPresenter({
      place: this.#sectionFilmsComponent.element,
      isExtra: true,
      listTitle: ListsTitles.RATED,
      filmsCardsPresenters:  this.#cardFilmPresenters
    });
  }

  #createMostCommentedFilmsListPresenter() {
    this.#mostCommentedFilmsListPresenter = new FilmsListPresenter({
      place: this.#sectionFilmsComponent.element,
      isExtra: true,
      listTitle: ListsTitles.COMMENTED,
      filmsCardsPresenters:  this.#cardFilmPresenters
    });
  }

  #updateFilters = () => {
    this.#filmsModel.updateCounter();
    const updateFiltersComponent = new FiltersFilmsView(this.#filmsModel);
    replace(updateFiltersComponent, this.#filtersFilmsComponent);
    this.#filtersFilmsComponent = updateFiltersComponent;
  };

  init() {
    this.#setFilmsCardsPresenters();
    this.#createMainFilmsListPresenter();
    this.#createTopRatedFilmsListPresenter();
    this.#createMostCommentedFilmsListPresenter();

    render(this.#headerComponent, this.#header);

    this.#filtersFilmsComponent = new FiltersFilmsView(this.#filmsModel);
    render(this.#filtersFilmsComponent, this.#main);
    if (this.#cardFilmPresenters.size) {
      render(this.#sortFilmsComponent, this.#main);
    }
    render(this.#sectionFilmsComponent, this.#main);

    this.#mainFilmsListPresenter.init();
    this.#topRatedFilmsListPresenter.init();
    this.#mostCommentedFilmsListPresenter.init();

    render(this.#footerComponent, this.#footer);
  }

  #initPopup = (cardFilmData) => {
    if (this.#popupPresenter) {
      this.#popupPresenter.removePopup();
    }
    document.body.classList.add('hide-overflow');

    this.#popupPresenter = new PopupPresenter(cardFilmData);
    this.#popupPresenter.init();
  };
}
