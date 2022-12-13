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

  get movies() {
    return this.#movies;
  }

  set movies(newMovies) {
    this.#movies = newMovies;
  }

  #getTemplate() {
    return createFooterStatistics(this.#movies);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
