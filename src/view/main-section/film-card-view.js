import AbstractView from '../../framework/view/abstract-view';
import { DescriptionTextLength } from '../../utils/const';
import { getDuration, setHumanizeDateFilmYear } from '../../utils/utils';


function createDescriptionText(description) {
  if (description.length > DescriptionTextLength.MAX) {
    return `${description.substring(DescriptionTextLength.MIN, DescriptionTextLength.MAX)}…`;
  }
  return `${description}`;
}

function createFilmCardLink(
  {title, totalRating: rating, release, duration, genre, poster, description},
  comments) {
  return `
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${ setHumanizeDateFilmYear(release.date) }</span>
      <span class="film-card__duration">${getDuration(Number(duration))}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${createDescriptionText(description)}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>`;
}

function createFilmCardControls({ alreadyWatched: watched, favorite, watchlist }) {
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
    ${createFilmCardLink(film.filmInfo, film.comments)}
    ${createFilmCardControls(film.userDetails)}
  </article>`;
}

export default class FilmCardView extends AbstractView {
  #film;

  #handleFilmClick = null;

  #watchlistClickHandler = null;
  #alreadyWatchedClickHandler = null;
  #favoriteClickHandler = null;

  constructor({ film, onFilmControlButtonFilterClick, onFilmClick }) {
    super();
    this.#film = film;
    this.#handleFilmClick = onFilmClick;

    this.#watchlistClickHandler = () => onFilmControlButtonFilterClick('watchlist');
    this.#alreadyWatchedClickHandler = () => onFilmControlButtonFilterClick('alreadyWatched');
    this.#favoriteClickHandler = () => onFilmControlButtonFilterClick('favorite');

    this.#initHandlers();
  }

  #initHandlers() {
    this.element.querySelector('.film-card__link').
      addEventListener('click', this.#filmClickHandler);

    this.element.querySelector('.film-card__controls-item--add-to-watchlist').
      addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').
      addEventListener('click', this.#alreadyWatchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').
      addEventListener('click', this.#favoriteClickHandler);
  }

  #filmClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilmClick();
  };

  get template() {
    return createFilmCard(this.#film);
  }
}
