import { remove, render } from '../framework/render';
import FilmsListContainerView from '../view/main-section/containers/films-list-container-view';
import SectionFilmsListView from '../view/main-section/sections/section-films-list-view';

export default class ExtraFilmsListPresenter {
  #place;
  #isExtra = true;
  #listTitle;
  #films;

  #sectionFilmsListComponent;
  #filmsListContainerComponent;

  constructor({ films, listTitle }) {
    this.#films = films;
    this.#listTitle = listTitle;
  }

  #createSectionFilmList() {
    return new SectionFilmsListView({
      isExtra: this.#isExtra,
      listTitle: this.#listTitle
    });
  }

  #renderCardFilm(film) {
    film.init(this.#filmsListContainerComponent.element);
  }

  #renderCardsFilms() {
    this.#films
      .forEach((film) => this.#renderCardFilm(film));
  }

  #renderFilmListContainers() {
    this.#filmsListContainerComponent = new FilmsListContainerView();
    this.#sectionFilmsListComponent = this.#createSectionFilmList();
    render(this.#sectionFilmsListComponent, this.#place);
    render(this.#filmsListContainerComponent, this.#sectionFilmsListComponent.element);
  }

  #renderFilmList() {
    const filmCount = this.#films.length;
    if (filmCount) {
      return null;
    }

    this.#renderFilmListContainers();
    this.#renderCardsFilms();
  }

  destroy() {
    remove(this.#sectionFilmsListComponent);
    remove(this.#filmsListContainerComponent);
    this.#films = null;
  }

  init({ place }) {
    this.#place = place;
    this.#renderFilmList();
  }

}
