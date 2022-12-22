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
  #endPoint;

  constructor(filmList) {
    this.#list = filmList;
  }

  get template() {
    return createFilmListContainer();
  }

  getFilmInStep() {
    this.#endPoint = this.#startPoint + this.#step;
    this.#currentFilmsRange = this.#list.slice(this.#startPoint, this.#endPoint);
    this.#startPoint = this.#endPoint;
  }

  isFilmsOver() {
    let show = true;
    if (this.#list.length - 1 > this.#endPoint) {
      show = false;
    }
    return show;
  }

  renderCurrentFilmCards() {
    this.getFilmInStep();
    this.#currentFilmsRange.forEach((cardFilm) => this.#createCardFilm(cardFilm));
  }

  #createCardFilm(CardFilmModel) {
    return render(new NewFilmCardView(CardFilmModel), this.element);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.getFilmInStep();
      if (this.#currentFilmsRange.length) {
        this.#currentFilmsRange.forEach((cardFilm) => this.#createCardFilm(cardFilm));
      }
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
