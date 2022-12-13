import { createElement, render } from '../../render.js';
import NewFilmCardView from '../organism/film-card-view.js';


function createFilmListContainer() {
  return '<div class="films-list__container"></div>';
}

export default class NewFilmListContainerView {
  #element = null;
  #list;

  constructor(filmList) {
    this.#list = filmList;
  }

  #getTemplate() {
    return createFilmListContainer();
  }

  #createCardFilm(CardFilmModel) {
    return render(new NewFilmCardView(CardFilmModel), this.element);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
      this.#list.forEach((cardFilm) => this.#createCardFilm(cardFilm));
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
