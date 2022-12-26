import { createElement, render } from '../../render.js';
import NewFilmCardView from '../organism/film-card-view.js';


function createFilmListContainer() {
  return '<div class="films-list__container"></div>';
}

export default class NewFilmListContainerView {
  #element = null;
  #list;
  #startPoint = 0;
  #step = 5;
  #currentFilmsRange;

  #createCardFilm(CardFilmModel) {
    return render(new NewFilmCardView(CardFilmModel), this.element);
  }

  #getFilmsInStep() {
    this.#currentFilmsRange = this.#list.slice(this.#startPoint, this.#startPoint += this.#step);
  }

  onShowMoreFilms = (evt) => {
    this.#renderCurrentFilmCards();
    if (this.#isFilmsOver()) {
      evt.target.style.display = 'none';
    }
  };

  constructor(filmList) {
    this.#list = filmList;
  }

  get template() {
    return createFilmListContainer();
  }

  #isFilmsOver() {
    let show = true;
    if (this.#list.length - 1 > this.#startPoint) {
      show = false;
    }
    return show;
  }

  #renderCurrentFilmCards() {
    this.#getFilmsInStep();
    this.#currentFilmsRange.forEach((cardFilm) => this.#createCardFilm(cardFilm));
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.#renderCurrentFilmCards();
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
