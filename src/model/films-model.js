import { createMockFilm } from '../mocks/films.js';

const FILMS_LIST_LENGTH = 12;

export default class FilmsModel {
  #wathclistCounter = 0;
  #watchedCounter = 0;
  #favoriteCounter = 0;
  #filmsModel = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);

  get films() {
    return this.#filmsModel;
  }

  #resetCounter() {
    this.#wathclistCounter = 0;
    this.#watchedCounter = 0;
    this.#favoriteCounter = 0;
  }

  updateCounter() {
    this.#resetCounter();
    this.#filmsModel.forEach((film) => {
      if (film.user_details.watchlist) {
        this.#wathclistCounter++;
      }
      if (film.user_details.already_watched) {
        this.#watchedCounter++;
      }
      if (film.user_details.favorite) {
        this.#favoriteCounter++;
      }
    });

  }

  get watchlist() {
    this.updateCounter();
    return this.#wathclistCounter;
  }

  get watched() {
    this.updateCounter();
    return this.#watchedCounter;
  }

  get favorite() {
    this.updateCounter();
    return this.#favoriteCounter;
  }

}
