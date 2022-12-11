import { createElement } from '../../render.js';

function createCardFilmDescription({ title, rating, year, duration, genre, poster, description, counter }) {
  let commentsCounter = 'comment';
  if (Number(counter) > 1) {
    commentsCounter = 'comments';
  }
  return `<a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${counter} ${commentsCounter}</span>
          </a>`;
}

export default class NewFilmCardDescriptionView {
  constructor (CardFilmModel) {
    this.filmInfo = CardFilmModel;
  }

  getTemplate() {
    return createCardFilmDescription(this.filmInfo);
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
