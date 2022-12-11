import { render } from '../render.js';
import NewFooterStatisticsView from '../view/atom/footer-statistics.js';

export default class FooterPresenter {
  footerStatisticComponent = new NewFooterStatisticsView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.footerStatisticComponent, this.boardContainer);
  }
}
