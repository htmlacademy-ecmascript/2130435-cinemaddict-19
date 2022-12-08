import { createElement } from '../../render.js';


function createFooterStatistics(findMovies) {
  return `<section class="footer__statistics">
    <p>${findMovies} movies inside</p>
    </section>`;
}

export default class NewFooterStatisticsView {
  constructor(findMovies = 0) {
    this.findMovies = findMovies;
  }

  setMovies(newFindMovies) {
    this.findMovies = newFindMovies;
  }

  getTemplate() {
    return createFooterStatistics(this.findMovies);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
