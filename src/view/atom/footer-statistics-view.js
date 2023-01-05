import AbstractView from '../../framework/view/abstract-view.js';

function createFooterStatistics(findMovies) {
  return `<section class="footer__statistics">
    <p>${findMovies} movies inside</p>
    </section>`;
}

export default class NewFooterStatisticsView extends AbstractView{
  #movies;

  constructor(movies = 0) {
    super();
    this.#movies = movies;
  }

  get template() {
    return createFooterStatistics(this.#movies);
  }
}
