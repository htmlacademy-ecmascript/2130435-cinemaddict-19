import { render } from '../framework/render.js';
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
  #cardFilmsPresenters = new Map();

  #filmsModel;
  #commentsModel;

  #currentFilm = null;
  #currentFilmComments = null;

  #header;
  #main;
  #footer;

  #headerComponent = new HeaderView();
  #footerComponent = new FooterView();

  #filtersFilmsComponent = new FiltersFilmsView();
  #sortFilmsComponent = new SortFilmsView();
  #sectionFilmsComponent = new SectionFilmsView();

  #mainFilmsListPresenter = new FilmsListPresenter({
    place: this.#sectionFilmsComponent.element,
    filmsCardsPresenter: this.#cardFilmsPresenters
  });

  #topRatedFilmsListPresenter = new FilmsListPresenter({
    place: this.#sectionFilmsComponent.element,
    isExtra: true,
    listTitle: ListsTitles.RATED,
    filmsCardsPresenter:  this.#cardFilmsPresenters
  });

  #mostCommentedFilmsListPresenter = new FilmsListPresenter({
    place: this.#sectionFilmsComponent.element,
    isExtra: true,
    listTitle: ListsTitles.COMMENTED,
    filmsCardsPresenter:  this.#cardFilmsPresenters
  });

  constructor({header, main, footer, filmsModel, commentsModel}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#filmsModel = filmsModel.films;
    this.#commentsModel = commentsModel.comments;
  }

  #setFilmsCardsPresenters() {
    this.#filmsModel.forEach((film) => {
      const filmCardPresenter = new FilmCardPresenter({currentFilmModel: film});
      this.#cardFilmsPresenters.set(film.id, filmCardPresenter);
    });
  }

  init() {

    this.#setFilmsCardsPresenters();
    render(this.#headerComponent, this.#header);

    render(this.#filtersFilmsComponent, this.#main);
    render(this.#sortFilmsComponent, this.#main);
    render(this.#sectionFilmsComponent, this.#main);

    this.#mainFilmsListPresenter.init();
    this.#topRatedFilmsListPresenter.init();
    this.#mostCommentedFilmsListPresenter.init();

    render(this.#footerComponent, this.#footer);
    this.#findFilm();
    const popupPresenter = new PopupPresenter({currentFilmModel: this.#currentFilm, currentFilmCommentsModel: this.#currentFilmComments });
    popupPresenter.init();
  }

  #findFilm() {
    this.#currentFilm = this.#filmsModel[0];
    this.#currentFilmComments = [this.#commentsModel[0], this.#commentsModel[1], this.#commentsModel[3]];
  }

}
