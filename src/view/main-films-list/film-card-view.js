import AbstractView from '../../framework/view/abstract-view.js';
import { setHumanizeDateFilmYear } from '../../utils/utils.js';

function createFilmCard(film) {
  const {title, total_rating: rating, release, duration, genre, poster, description} = film.film_info;
  return `
  <article class="film-card">
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
      <span class="film-card__comments">${film.comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
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
