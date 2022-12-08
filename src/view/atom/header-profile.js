import { createElement } from '../../render.js';

function createHeaderProfile(src, rank) {
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="${src}" alt="Avatar" width="35" height="35">
    </section>`;
}

export default class NewHeaderProfileView {
  constructor(avatar = 'images/bitmap@2x.png', rank = 'Movie Buff') {
    this.avatar = avatar;
    this.rank = rank;
  }

  getTemplate() {
    return createHeaderProfile(this.avatar, this.rank);
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
