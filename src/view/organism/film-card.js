import { createElement } from '../../render.js';
import NewCardFilmDescriptionView from '../atom/film-description.js';
import NewCardFilmControlsView from '../molecule/film-card-controls.js';

function createFilmCard() {
  return '<article class="film-card"></article>';
}

export default class NewFilmCardView {
  constructor(descriptionFilmCard) {
    const { title, rating, year, duration, genre, poster, description, counter, isWatchList = false, isWatched = false, isFavorite = false } = descriptionFilmCard;
    this.title = title;
    this.rating = rating;
    this.year = year;
    this.duration = duration;
    this.genre = genre;
    this.poster = poster;
    this.description = description;
    this.counter = counter;
    this.isWatchList = isWatchList;
    this.isWatched = isWatched;
    this.isFavorite = isFavorite;
  }

  setStateControl(newWatchList = this.isWatchList, newWatched = this.isWatched, newFavorite = this.isFavorite) {
    this.isWatchList = newWatchList;
    this.isWatched = newWatched;
    this.isFavorite = newFavorite;
  }

  getTemplate() {
    return createFilmCard();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.insertAdjacentElement('beforeend', new NewCardFilmDescriptionView(this.title, this.rating, this.year, this.duration, this.genre, this.poster, this.description, this.counter).getElement());
      this.element.insertAdjacentElement('beforeend', new NewCardFilmControlsView(this.isWatchList, this.isWatched, this.isFavorite).getElement());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

