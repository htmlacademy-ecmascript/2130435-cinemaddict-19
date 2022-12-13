import { render } from '../render.js';
import NewHeaderProfileView from '../view/atom/header-profile-view.js';

export default class HeaderPresenter {
  #place;
  #headerComponent = new NewHeaderProfileView();

  constructor(place) {
    this.#place = place;
  }

  init() {
    render(this.#headerComponent, this.#place);
  }
}
