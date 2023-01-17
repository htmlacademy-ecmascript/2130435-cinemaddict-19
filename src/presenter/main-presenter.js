import { render } from '../framework/render.js';
import FooterView from '../view/footer/footer-view.js';
import HeaderView from '../view/header/header-view.js';
import FilmCardView from '../view/main-films-list/film-card-view.js';
import FiltersFilmsView from '../view/main-films-list/filters-view.js';
import SectionFilmsView from '../view/main-films-list/sections/section-films-view.js';
import SortFilmsView from '../view/main-films-list/sort-view.js';
import FilmsListPresenter from './films-list-presenter.js';
import PopupPresenter from './popup-presenter.js';

const ListsTitles = {
  COMMENTED: 'Most commented',
  RATED: 'Top rated'
};

export default class MainPresenter {
  #cardFilmsPresenters = new Map();

  #filmsModel;

  #header;
  #main;
  #footer;

  #headerComponent = new HeaderView();
  #footerComponent = new FooterView();

  #filtersFilmsComponent = new FiltersFilmsView();
  #sortFilmsComponent = new SortFilmsView();
  #sectionFilmsComponent = new SectionFilmsView();

  #mainFilmsListPresenter = new FilmsListPresenter({
    place: this.#sectionFilmsComponent.element
  });

  #topRatedFilmsListPresenter = new FilmsListPresenter({
    place: this.#sectionFilmsComponent.element,
    isExtra: true,
    listTitle: ListsTitles.RATED,
  });

  #mostCommentedFilmsListPresenter = new FilmsListPresenter({
    place: this.#sectionFilmsComponent.element,
    isExtra: true,
    listTitle: ListsTitles.COMMENTED,
  });

  constructor({header, main, footer, filmsModel}) {
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#filmsModel = filmsModel;
  }

  #setFilmsCardsPresenters() {
    this.#filmsModel.forEach((film) => {
      const filmCardComponent = new FilmCardView(film);
      this.#cardFilmsPresenters.set(film.id, filmCardComponent);
    });
  }

  init() {
    render(this.#headerComponent, this.#header);

    render(this.#filtersFilmsComponent, this.#main);
    render(this.#sortFilmsComponent, this.#main);
    render(this.#sectionFilmsComponent, this.#main);

    this.#mainFilmsListPresenter.init(0, 5);
    this.#topRatedFilmsListPresenter.init(0, 2);
    this.#mostCommentedFilmsListPresenter.init(0, 2);

    render(this.#footerComponent, this.#footer);

    const popupPresenter = new PopupPresenter();
    // popupPresenter.init();
  }
}
