import AbstractView from '../../framework/view/abstract-view';
import {RankWatchedRange} from '../../utils/const';

function getRank(watchedCounter) {
  switch (true) {
    case watchedCounter > RankWatchedRange.MIN_NOVICE && watchedCounter <= RankWatchedRange.MAX_NOVICE :
      return 'Novice';
    case watchedCounter >= RankWatchedRange.MIN_FAN && watchedCounter <= RankWatchedRange.MAX_FAN :
      return 'Fan';
    case watchedCounter >= RankWatchedRange.MIN_MOVIE_BUFF :
      return 'Movie Buff';
    default:
      return '';
  }
}

function createHeader(watchedCounter) {
  return `
  <section class="header__profile profile">
    <p class="profile__rating">${getRank(watchedCounter)}</p>
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
