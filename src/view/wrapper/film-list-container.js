import { createElement, render } from '../../render.js';
import NewFilmCardView from '../organism/film-card.js';


function createFilmListContainer() {
  return '<div class="films-list__container"></div>';
}

export default class NewFilmListContainerView {
  constructor(filmList) {
    this.list = filmList;
  }

  getTemplate() {
    return createFilmListContainer();
  }

  createCardFilm(cardFilm) {
    return render(new NewFilmCardView(cardFilm.CardFilmModel), this.element);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.list.forEach((cardFilm) => this.createCardFilm(cardFilm));
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
