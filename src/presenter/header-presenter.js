import { render } from '../render.js';
import NewHeaderProfileView from '../view/atom/header-profile-view.js';

export default class HeaderPresenter {
  headerComponent = new NewHeaderProfileView();

  constructor(boardContainer) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.headerComponent, this.boardContainer);
  }
}
