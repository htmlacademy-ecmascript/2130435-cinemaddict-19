import { createMockFilm } from '../mocks/films.js';
import { getRandomElementArray } from '../utils.js';

const FILMS_LIST_LENGTH = 12;

export default class FilmsModel {
  #films = Array.from({ length: FILMS_LIST_LENGTH }, createMockFilm);

  get films() {
    return this.#films;
  }

  get twoFilms() {
    return [getRandomElementArray(this.#films), getRandomElementArray(this.#films)];
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

  get topRated() {
    return this.#films.slice().sort(this.sortTopRated);
  }

  get mostCommented() {
    return this.#films.slice().sort(this.sortMostCommented);
  }
}
