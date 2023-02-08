import AbstractView from '../../framework/view/abstract-view';
import {RankWatchedRange} from '../../utils/const';

function getRank(watchedCounter) {
  switch (true) {
    case watchedCounter > RankWatchedRange.MIN_NOVICE && watchedCounter <= RankWatchedRange.MAX_NOVICE :
      return '<p class="profile__rating">Novice</p>';
    case watchedCounter > RankWatchedRange.MIN_FAN && watchedCounter <= RankWatchedRange.MAX_FAN :
      return '<p class="profile__rating">Fan</p>';
    case watchedCounter >= RankWatchedRange.MIN_MOVIE_BUFF :
      return '<p class="profile__rating">Movie Buff</p>';
    default:
      return '';
  }
}

function createHeader(watchedCounter) {
  return `
  <section class="header__profile profile">
    ${getRank(watchedCounter)}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
}

export default class HeaderView extends AbstractView {
  #watchedCounter;

  constructor({watchedCounter}) {
    super();
    this.#watchedCounter = watchedCounter;
  }

  get template() {
    return createHeader(this.#watchedCounter);
  }
}
