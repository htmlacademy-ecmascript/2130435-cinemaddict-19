import AbstractView from '../../framework/view/abstract-view.js';
import { setHumanizeDateFilmYear } from '../../utils/utils.js';

const MIN_TEXT_LENGTH = 0;
const MAX_TEXT_LENGTH = 139;

function createDescriptionText(description) {
  if (description.length > MAX_TEXT_LENGTH) {
    return `${description.substring(MIN_TEXT_LENGTH, MAX_TEXT_LENGTH)}...`;
  }
  return `${description}`;
}

function createFilmCardLink(
  {title, total_rating: rating, release, duration, genre, poster, description},
  {comments}) {
  return `
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${ setHumanizeDateFilmYear(release.date) }</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${createDescriptionText(description)}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>`;
}

function createFilmCardControls({ already_watched: watched, favorite, watchlist }) {
  return `
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>`;
}

function createFilmCard(film) {
  return `
  <article class="film-card">
    ${createFilmCardLink(film.film_info, film)}
    ${createFilmCardControls(film.user_details)}
  </article>`;
}

export default class FilmCardView extends AbstractView {
  #film;
  #handleFilmCardClick = null;

  #watchlistClickHandler = null;
  #alreadyWatchedClickHandler = null;
  #favoriteClickHandler = null;

  constructor({currentFilmModel, onFilmCardClick, onUserDetailButtonClick}) {
    super();
    this.#film = currentFilmModel;
    this.#handleFilmCardClick = onFilmCardClick;

    this.#watchlistClickHandler = () => onUserDetailButtonClick('watchlist');
    this.#alreadyWatchedClickHandler = () => onUserDetailButtonClick('already_watched');
    this.#favoriteClickHandler = () => onUserDetailButtonClick('favorite');

    this.element.querySelector('.film-card__link').
      addEventListener('click', this.#filmCardClickHandler);

    this.#addHandlerForControlButton();
  }

  #addHandlerForControlButton() {
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').
      addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').
      addEventListener('click', this.#alreadyWatchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').
      addEventListener('click', this.#favoriteClickHandler);
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilmCardClick();
  };

  get template() {
    return createFilmCard(this.#film);
  }
}
