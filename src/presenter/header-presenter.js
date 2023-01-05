import { render } from '../framework/render.js';
import NewHeaderProfileView from '../view/atom/header-profile-view.js';

export default class HeaderPresenter {
  #place;
  #user;

  constructor(place, UserModel) {
    this.#place = place;
    this.#user = UserModel.user;
  }

  init() {
    const headerComponent = new NewHeaderProfileView(this.#user);
    render(headerComponent, this.#place);
  }
}
