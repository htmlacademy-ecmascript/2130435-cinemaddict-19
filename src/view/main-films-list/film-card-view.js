import AbstractView from '../../framework/view/abstract-view.js';
import { setHumanizeDateFilmYear } from '../../utils/utils.js';

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
    <p class="film-card__description">${description}</p>
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

  constructor({currentFilmModel}) {
    super();
    this.#film = currentFilmModel;
  }

  get template() {
    return createFilmCard(this.#film);
  }
}