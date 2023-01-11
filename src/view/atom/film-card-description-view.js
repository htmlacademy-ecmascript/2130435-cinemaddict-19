import { setHumanizeDateFilmYear } from '../../utils.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createCardFilmDescription({ title, total_rating: rating, release, duration, genre, poster, description }, counterComments) {
  let commentsCounter = 'comment';
  if (Number(counterComments) > 1) {
    commentsCounter = 'comments';
  }
  return `<a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${ setHumanizeDateFilmYear(release.date) }</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre.join(', ')}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${counterComments} ${commentsCounter}</span>
          </a>`;
}

export default class NewFilmCardDescriptionView extends AbstractView {
  #filmInfo;
  #comments;

  /**
   * Деструктуризация FilmModel
   * @param {object} FilmModel.film_info Объект с подробной информацией о фильме
   * @param {array} FilmModel.comments Массив комментариев к фильму
   */
  constructor ({film_info: filmInfo, comments}) {
    super();
    this.#filmInfo = filmInfo;
    this.#comments = comments;
  }

  get template() {
    return createCardFilmDescription(this.#filmInfo, this.#comments.length);
  }
}
