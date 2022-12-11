import { createMockComment } from '../mocks/comments.js';

const COMMENTS_LIST_LENGTH = 9;

export default class FilmsModel {
  films = Array.from({ length: COMMENTS_LIST_LENGTH }, createMockComment);

  getFilms() {
    return this.films;
  }
}
