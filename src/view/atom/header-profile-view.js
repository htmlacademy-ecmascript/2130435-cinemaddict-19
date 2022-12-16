import { createElement } from '../../render.js';

function createHeaderProfile(src, rank) {
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="${src}" alt="Avatar" width="35" height="35">
    </section>`;
}

export default class NewHeaderProfileView {
  #element = null;
  #avatar;
  #rank;

  constructor({ avatar, rank }) {
    this.#avatar = avatar;
    this.#rank = rank;
  }

  get template() {
    return createHeaderProfile(this.#avatar, this.#rank);
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
