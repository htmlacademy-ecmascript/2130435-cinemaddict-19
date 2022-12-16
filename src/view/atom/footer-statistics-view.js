import { createElement } from '../../render.js';


function createFooterStatistics(findMovies) {
  return `<section class="footer__statistics">
    <p>${findMovies} movies inside</p>
    </section>`;
}

export default class NewFooterStatisticsView {
  #element = null;
  #movies;

  constructor(movies = 0) {
    this.#movies = movies;
  }

  get template() {
    return createFooterStatistics(this.#movies);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
