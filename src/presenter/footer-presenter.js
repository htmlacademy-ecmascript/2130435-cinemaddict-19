import { render } from '../framework/render.js';
import NewFooterStatisticsView from '../view/atom/footer-statistics-view.js';

export default class FooterPresenter {
  #place;
  #footerStatisticComponent = new NewFooterStatisticsView();

  constructor(place) {
    this.#place = place;
  }

  init() {
    render(this.#footerStatisticComponent, this.#place);
  }
}
