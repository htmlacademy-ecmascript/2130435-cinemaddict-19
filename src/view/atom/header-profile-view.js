import AbstractView from '../../framework/view/abstract-view.js';

function createHeaderProfile(src, rank) {
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="${src}" alt="Avatar" width="35" height="35">
    </section>`;
}

export default class NewHeaderProfileView extends AbstractView {
  #avatar;
  #rank;

  constructor({ avatar, rank }) {
    super();
    this.#avatar = avatar;
    this.#rank = rank;
  }

  get template() {
    return createHeaderProfile(this.#avatar, this.#rank);
  }
}
