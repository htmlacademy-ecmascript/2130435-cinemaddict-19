import AbstractView from '../../framework/view/abstract-view.js';

function createFiltersFilms(filmsModel) {
  return `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filmsModel.watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filmsModel.watched}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filmsModel.favorite}</span></a>
  </nav>`;
}

export default class FiltersFilmsView extends AbstractView {
  #filmsModel;

  constructor(filmsModel) {
    super();

    this.#filmsModel = filmsModel;
    this.#filmsModel.updateCounter();
  }

  get template() {
    return createFiltersFilms(this.#filmsModel);
  }
}
