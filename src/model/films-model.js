import { createMockFilm } from '../mocks/films.js';

const FILMS_LIST_LENGTH = 12;

export default class FilmsModel {
  #films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);
  #watchlistCounter = 0;
  #historyCounter = 0;
  #favoritesCounter = 0;

  get films() {
    return this.#films;
  }

  #calculateCorrectFilmsMarks() {
    this.#films.forEach(({user_details: userDetails }) => {
      const { watchlist, already_watched: history, favorite } = userDetails;
      if (watchlist) {
        this.#watchlistCounter++;
      }
      if (history) {
        this.#historyCounter++;
      }
      if (favorite) {
        this.#favoritesCounter++;
      }
    });
  }

  sortTopRated(firstFilm, secondFilm) {
    const {total_rating: secondFilmRating} = secondFilm.film_info;
    const {total_rating: firstFilmRating} = firstFilm.film_info;
    return Number(secondFilmRating) - Number(firstFilmRating);
  }

  sortMostCommented(firstFilm, secondFilm) {
    const {comments: secondFilmCommented} = secondFilm;
    const {comments: firstFilmCommented} = firstFilm;
    return secondFilmCommented.length - firstFilmCommented.length;
  }

  getCorrectFilmsMarks() {
    this.#calculateCorrectFilmsMarks();
    return {
      watchlistCounter: this.#watchlistCounter,
      historyCounter: this.#historyCounter,
      favoritesCounter: this.#historyCounter
    };
  }

  get topRated() {
    return this.#films.slice().sort(this.sortTopRated);
  }

  get mostCommented() {
    return this.#films.slice().sort(this.sortMostCommented);
  }
}
